#!/usr/bin/env python3
"""Check every browser script and local HTML reference, including the offline ZIP."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import posixpath
import subprocess
import zipfile

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / 'public'


class References(HTMLParser):
    def __init__(self):
        super().__init__()
        self.targets = []

    def handle_starttag(self, tag, attrs):
        self.targets.extend(value for key, value in attrs
                            if key in ('src', 'href') and value)


def check_links(files):
    failures = []
    for name, contents in files.items():
        if not name.endswith('.html'):
            continue
        parser = References()
        parser.feed(contents.decode())
        for target in parser.targets:
            url = urlsplit(target)
            if url.scheme or url.netloc or not url.path:
                continue
            path = unquote(url.path)
            if path.startswith('/'):
                path = path.lstrip('/')
            else:
                path = posixpath.join(posixpath.dirname(name), path)
            path = posixpath.normpath(path)
            if path in ('', '.'):
                path = 'index.html'
            if path not in files and path.rstrip('/') + '/index.html' not in files:
                failures.append(f'{name}: {target}')
    assert not failures, 'Missing local targets:\n' + '\n'.join(failures)


scripts = sorted(PUBLIC.rglob('*.js'))
for script in scripts:
    subprocess.run(['node', '--check', str(script)], check=True)
check_links({str(p.relative_to(PUBLIC)): p.read_bytes()
             for p in PUBLIC.rglob('*') if p.is_file()})
with zipfile.ZipFile(PUBLIC / 'downloads/ai-for-good.zip') as archive:
    assert archive.testzip() is None, 'Offline archive failed its CRC check'
    check_links({name: archive.read(name) for name in archive.namelist()})
print(f'Passed: {len(scripts)} scripts, public links, offline links and ZIP integrity.')
