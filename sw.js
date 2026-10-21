const CACHE_NAME = 'monkey-sing-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './data/songs.json',
  './data/lyrics/welcome.txt',
  './data/lyrics/studio.txt',
  './data/lyrics/lullaby.txt',
  './data/lyrics/rainy.txt'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
