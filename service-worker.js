const CACHE_NAME = "deenquest-v26";
const APP_ASSETS = [
  "./",
  "./index.html",
  "./styles.css?v=26",
  "./app.js?v=26",
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
