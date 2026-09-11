/* The tracker itself is never cached — it is live data behind a tunnel whose
   address changes. Only this launcher shell is cached, so the app opens even
   when the phone is on a bad signal and can still tell you where to go. */
const SHELL = "brf-kpi-shell-v1";
const FILES = ["./", "./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(SHELL).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== SHELL).map(k => caches.delete(k))))
      .then(() => self.clients.claim()));
});

self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);
  // Never touch the tunnel or the GitHub lookup — those must always be live.
  if (url.origin !== self.location.origin) return;
  event.respondWith(
    fetch(event.request)
      .then(resp => {
        const copy = resp.clone();
        caches.open(SHELL).then(c => c.put(event.request, copy)).catch(() => {});
        return resp;
      })
      .catch(() => caches.match(event.request).then(hit => hit || caches.match("./index.html"))));
});
