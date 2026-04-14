// ── Thinkerball Service Worker ──────────────────────────────
// Strategy:
//   Navigation requests  → cache-first with network fallback (SPA offline)
//   Static assets        → stale-while-revalidate (fast + stays fresh)
//
// Bump CACHE_VERSION whenever a breaking change is deployed so
// the activate handler clears the old cache automatically.
// ─────────────────────────────────────────────────────────────

const CACHE_VERSION = 'v3';
const CACHE_NAME    = `thinkerball-${CACHE_VERSION}`;

// Pre-cached app shell — everything else is cached at runtime
const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
];

// ── install: pre-cache the shell ─────────────────────────────
self.addEventListener('install', (event) => {
  // Take over immediately — don't wait for old SW to be discarded
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
});

// ── activate: delete stale caches ────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// ── fetch: route by request type ─────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET requests over http(s)
  if (request.method !== 'GET' || !request.url.startsWith('http')) return;

  if (request.mode === 'navigate') {
    // Navigation (HTML) — serve shell from cache; fall back to network
    event.respondWith(
      caches.match('/index.html').then((cached) => cached || fetch(request))
    );
    return;
  }

  // Assets (JS, CSS, images, fonts) — stale-while-revalidate
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) =>
      cache.match(request).then((cached) => {
        const networkFetch = fetch(request).then((response) => {
          if (response.ok) cache.put(request, response.clone());
          return response;
        }).catch(() => cached); // network failed → return stale if we have it

        // Return cached immediately; revalidate in the background
        return cached || networkFetch;
      })
    )
  );
});
