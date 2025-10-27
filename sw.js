
const CACHE_NAME = 'snakeengine-ai-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  // Note: In a real build, you'd cache the generated JS and CSS files.
  // For this environment, we are caching the CDN scripts, though this might not be optimal.
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
