#!/usr/bin/env python3
"""Package the Opus renderer for classic scripts and create the offline copy."""
from pathlib import Path
import zipfile

ROOT = Path(__file__).resolve().parent.parent
public = ROOT / 'public'
scene = (ROOT / 'src/seed-scene.js').read_text()
assert scene.startswith('export function drawScene('), 'Unexpected renderer format'
(public / 'assets/seed-scene.js').write_text(
    '// Scene authored by Claude Opus 5.5. See docs/provenance.\n' +
    scene.replace('export function drawScene(', 'function drawScene(', 1))
downloads = public / 'downloads'
downloads.mkdir(exist_ok=True)
download_link = '<a href="downloads/ai-for-good.zip" download>Download an offline copy ↓</a>'
with zipfile.ZipFile(downloads / 'ai-for-good.zip', 'w', zipfile.ZIP_DEFLATED) as archive:
    for file in sorted(public.rglob('*')):
        if not file.is_file() or 'downloads' in file.relative_to(public).parts or file.name.startswith('_') or file.name == '404.html':
            continue
        relative = str(file.relative_to(public))
        if relative == 'index.html':
            html = file.read_text()
            assert html.count(download_link) == 1, 'Offline download link changed'
            archive.writestr(relative, html.replace(download_link, '<span>Offline copy</span>'))
        else:
            archive.write(file, relative)
    archive.writestr('START-HERE.txt', 'Open index.html in your browser. No internet or installation is needed.\nSeed Courier and Make it clearer have local controls and prepared examples.\nAI for Good: https://github.com/justcarlson/ai-for-good\n')
print('Built classic-script renderer and public/downloads/ai-for-good.zip')
