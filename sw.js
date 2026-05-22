// Service Worker - PokéColeção
const CACHE_NAME = 'pokecol-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Instalação: salva os arquivos principais no cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// Ativação: limpa caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

// Fetch: tenta a rede primeiro, cai para cache se offline
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
