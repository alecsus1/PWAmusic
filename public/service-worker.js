self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('music-pwa').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/css/styles.css',
          '/js/main.js',
          'https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css'
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  