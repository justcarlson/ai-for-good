/* Keep workshop choices in links, including in the offline copy. */
const WORKSHOP_NAV = (() => {
  const params = new URLSearchParams(location.search);
  const options = {
    theme: ['all', 'work', 'community', 'creative'],
    format: ['all', 'interactive', 'guided'],
    time: ['all', '5', '12', '15']
  };
  const isMenu = /\/workshop(?:\.html)?$/.test(location.pathname);
  const incoming = isMenu ? params : new URLSearchParams(params.get('menu') || '');
  const menu = {};
  for (const [key, values] of Object.entries(options)) {
    menu[key] = values.includes(incoming.get(key)) ? incoming.get(key) : 'all';
  }
  menu.host = incoming.get('host') === '1';
  if (['0', '1'].includes(params.get('host'))) menu.host = params.get('host') === '1';
  let route = [15, 30, 60, 180].includes(Number(params.get('route'))) ? params.get('route') : '';
  const originals = new WeakMap();

  function menuQuery(host = menu.host) {
    const query = new URLSearchParams();
    for (const key of Object.keys(options)) if (menu[key] !== 'all') query.set(key, menu[key]);
    if (host) query.set('host', '1');
    return query.toString();
  }

  function contextURL(href) {
    if (href.startsWith('#')) return href;
    const url = new URL(href, location.href);
    if (url.origin !== location.origin || url.protocol !== location.protocol) return href;
    const page = url.pathname.split('/').pop().replace(/\.html$/, '');
    const host = url.searchParams.has('host') ? url.searchParams.get('host') === '1' : menu.host;
    if (page === 'workshop') {
      for (const key of [...Object.keys(options), 'host']) url.searchParams.delete(key);
      for (const [key, value] of new URLSearchParams(menuQuery(host))) url.searchParams.set(key, value);
    } else if (page === 'activity' || page === 'routes' || url.pathname.includes('/demos/')) {
      const query = menuQuery(host);
      if (query) url.searchParams.set('menu', query); else url.searchParams.delete('menu');
      if (page === 'activity') url.searchParams.set('host', host ? '1' : '0');
    } else return href;
    if (route) url.searchParams.set('route', route);
    return url.href;
  }

  function syncLinks() {
    document.querySelectorAll('a[href]').forEach(link => {
      if (!originals.has(link)) originals.set(link, link.getAttribute('href'));
      link.href = contextURL(originals.get(link));
    });
  }

  function updateURL(values) {
    const url = new URL(location.href);
    for (const [key, value] of Object.entries(values)) {
      if (value === null || value === '') url.searchParams.delete(key);
      else url.searchParams.set(key, value);
    }
    // Some file:// browsers deny replaceState; navigation links still carry choices.
    try { history.replaceState(null, '', url); } catch { /* Links remain usable. */ }
  }

  syncLinks();
  return { menu, menuQuery, syncLinks, updateURL, setRoute(value) { route = String(value); }, get route() { return route; } };
})();
