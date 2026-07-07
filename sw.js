const CACHE = 'deneros-v4';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  // Navegações (o index.html): sempre buscar fresco, ignorando o cache HTTP,
  // pra que novos deploys apareçam no próximo reload (cai no cache só se offline).
  const isNav = e.request.mode === 'navigate';
  const req = isNav ? new Request(e.request, { cache: 'no-store' }) : e.request;
  e.respondWith(
    fetch(req)
      .then(r => {
        const clone = r.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return r;
      })
      .catch(() => caches.match(e.request))
  );
});
