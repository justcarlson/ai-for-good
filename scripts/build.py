#!/usr/bin/env python3
"""Package the Opus renderer for classic scripts and create the offline copy."""
from pathlib import Path
import json
import zipfile

ROOT = Path(__file__).resolve().parent.parent
public = ROOT / 'public'
from build_companion import build as build_companion
build_companion(ROOT)
from build_writing import build as build_writing
build_writing(ROOT)
scene = (ROOT / 'src/seed-scene.js').read_text()
assert scene.startswith('export function drawScene('), 'Unexpected renderer format'
(public / 'assets/seed-scene.js').write_text(
    '// Scene authored by Claude Opus 5.5. See docs/provenance.\n' +
    scene.replace('export function drawScene(', 'function drawScene(', 1))
audio = ROOT / 'src/tiny-tune.js'
if audio.exists():
    (public / 'assets/tiny-tune-engine.js').write_text(audio.read_text())
library_source = ROOT / 'content/workshop-library.json'
if library_source.exists():
    library = json.loads(library_source.read_text())
    activities = []
    for section, kind in [('existing', 'interactive'), ('newInteractive', 'interactive'), ('facilitated', 'guided')]:
        for original in library[section]:
            entry = {key: value for key, value in original.items()
                     if key not in ('interactionSpec', 'layoutSpec', 'mode')}
            entry['kind'] = kind
            if kind == 'interactive':
                entry['demoPath'] = f"demos/{entry['id']}.html"
            activities.append(entry)
    ids = {entry['id'] for entry in activities}
    assert len(ids) == len(activities), 'Duplicate activity IDs'
    for route in library['routes']:
        assert sum(step['minutes'] for step in route['steps']) == route['minutes'], 'Route time mismatch'
        assert all(step['activityId'] in ids or step['activityId'] == 'break' for step in route['steps'])
    for preset in library['audioPresets']:
        assert len(preset['notes']) == 8 and all(note in range(-1, 5) for note in preset['notes'])
    browser_library = {'activities': activities, 'routes': library['routes'], 'audioPresets': library['audioPresets']}
    (public / 'assets/workshop-library.js').write_text(
        'window.WORKSHOP_LIBRARY = ' + json.dumps(browser_library, ensure_ascii=False) + ';\n')
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
    archive.writestr('START-HERE.txt', 'Open index.html in your browser. No internet or installation is needed.\nThirteen activities: six interactive demos and seven guided exercises.\nAI for Good: https://github.com/justcarlson/ai-for-good\n')
print('Built classic-script renderer and public/downloads/ai-for-good.zip')
