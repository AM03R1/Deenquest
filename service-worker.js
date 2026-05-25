const CACHE_NAME = "deenquest-v38";
const APP_ASSETS = [
  "./",
  "./index.html",
  "./privacy.html",
  "./support.html",
  "./styles.css?v=38",
  "./app.js?v=38",
  "./manifest.webmanifest",
  "./assets/icon.svg",
  "./assets/prayer-standing.png",
  "./assets/prayer-ruku.png",
  "./assets/prayer-sujud.png",
  "./assets/prayer-sitting.png",
  "./assets/prayer-salam-sitting.png?v=19",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseCopy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseCopy));
          return response;
        })
        .catch(() =>
          caches.match(event.request).then((cachedResponse) => cachedResponse || caches.match("./index.html"))
        )
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).catch(() => {
          if (event.request.mode === "navigate") return caches.match("./index.html");
          return Response.error();
        })
      );
    })
  );
});
