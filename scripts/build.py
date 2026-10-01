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
with zipfile.ZipFile(downloads / 'ai-for-good.zip', 'w', zipfile.ZIP_DEFLATED) as archive:
    for file in sorted(public.rglob('*')):
        if file.is_file() and 'downloads' not in file.relative_to(public).parts and not file.name.startswith('_'):
            archive.write(file, str(file.relative_to(public)))
    archive.writestr('START-HERE.txt', 'Open index.html in your browser. No internet or installation is needed.\nSeed Courier and Make it clearer have local controls and prepared examples.\nAI for Good: https://github.com/justcarlson/ai-for-good\n')
print('Built classic-script renderer and public/downloads/ai-for-good.zip')
