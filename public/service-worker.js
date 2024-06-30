// Definisce la versione del cache e il nome del cache utilizzato
const VERSION = "v1";
const CACHE_NAME = `music-pwa-${VERSION}`;

// Definisce le risorse statiche da memorizzare nel cache
const APP_STATIC_RESOURCES = [
  "/",
  "/index.html",
  "/css/styles.css",
  "/js/main.js",
  "https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
];

// Evento 'install' del service worker
// Durante l'installazione, memorizza nel cache le risorse statiche definite
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      // Apre il cache con il nome definito
      const cache = await caches.open(CACHE_NAME);
      // Aggiunge tutte le risorse statiche al cache
      await cache.addAll(APP_STATIC_RESOURCES);
    })(),
  );
});

// Evento 'activate' del service worker
// Durante l'attivazione, elimina i vecchi cache se presenti
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // Recupera tutti i nomi dei cache
      const names = await caches.keys();
      // Elimina i cache che non corrispondono al nome del cache corrente
      await Promise.all(
        names.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        }),
      );
      // Fa sì che il service worker attivo prenda controllo immediato delle pagine
      await clients.claim();
    })(),
  );
});

// Evento 'fetch' del service worker
// Intercetta le richieste al server e risponde con le risorse memorizzate nel cache o dal network
self.addEventListener("fetch", (event) => {
  // Controlla se la richiesta è di navigazione (ad esempio, caricamento di una nuova pagina)
  if (event.request.mode === "navigate") {
    // Risponde con la pagina principale dalla cache
    event.respondWith(caches.match("/"));
    return;
  }

  // Per tutte le altre richieste, tenta di rispondere prima dal cache e poi dal network
  event.respondWith(
    (async () => {
      // Apre il cache con il nome definito
      const cache = await caches.open(CACHE_NAME);
      // Tenta di trovare la richiesta nel cache
      const cachedResponse = await cache.match(event.request);
      if (cachedResponse) {
        // Se la risposta è trovata nel cache, la restituisce
        return cachedResponse;
      }
      try {
        // Se la risorsa non è nel cache, la recupera dal network
        const networkResponse = await fetch(event.request);
        if (networkResponse.status === 200) {
          // Se la risposta dal network è valida, la memorizza nel cache per il futuro
          cache.put(event.request, networkResponse.clone());
        }
        // Restituisce la risposta del network
        return networkResponse;
      } catch (error) {
        // Se sia il cache che il network falliscono, restituisce una risposta di errore
        return new Response("Resource not available", {
          status: 404,
          statusText: "Resource not available",
        });
      }
    })(),
  );
});

  