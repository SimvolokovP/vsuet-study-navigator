const VERSION = 'v1.0.3'; 
const HTML_CACHE_NAME = `html-cache-${VERSION}`;
const API_CACHE_NAME = `api-data-${VERSION}`;
const STATIC_ASSETS_CACHE = `static-assets-${VERSION}`;
const CACHE_WHITELIST = [HTML_CACHE_NAME, API_CACHE_NAME, STATIC_ASSETS_CACHE];

const OFFLINE_URL = "/offline.html";
const CACHE_EXCLUDE = ["/admin"];

const TTL_CONFIG = {
    [HTML_CACHE_NAME]: 24 * 60 * 60 * 1000,
    [API_CACHE_NAME]: 9 * 60 * 60 * 1000,
};

function isNavigationRSCRequest(request) {
    const url = new URL(request.url);

    if (url.pathname.includes("/_rsc")) return true;
    if (url.search.includes("_rsc")) return true;
    if (request.headers.get("Rsc") === "1") return true;
    if (request.headers.get("Next-Router-State-Tree")) return true;
    if (request.headers.get("Next-Url")) return true;
    if (request.headers.get("X-Nextjs-Request-Id")) return true;

    return false;
}

function isCacheAllowed(request) {
    const url = new URL(request.url);

    const isExcluded = CACHE_EXCLUDE.some(path => url.pathname.startsWith(path));
    if (isExcluded) return false;

    if (isNavigationRSCRequest(request)) return false;

    if (url.pathname.match(/\.(js|css|woff2?|ttf|eot|png|jpg|jpeg|gif|svg|ico)$/)) {
        return true;
    }

    if (url.pathname.includes("/_next/")) {
        return false;
    }

    return (
        url.origin === self.location.origin ||
        url.pathname.includes("/api/")
    );
}

function isApiRequest(url) {
    return url.pathname.includes("/api/")
}

async function cleanupExpiredCache(cacheName) {
    try {
        const cache = await caches.open(cacheName);
        const requests = await cache.keys();
        const ttl = TTL_CONFIG[cacheName];

        if (!ttl) return;

        const cleanupPromises = requests.map(async (request) => {
            const response = await cache.match(request);
            if (!response) return;

            const dateHeader = response.headers.get('sw-cache-timestamp');
            if (!dateHeader) return;

            const age = Date.now() - parseInt(dateHeader, 10);
            if (age > ttl) {
                await cache.delete(request);
                console.log(`Cleaned up expired cache: ${request.url}`);
            }
        });

        await Promise.all(cleanupPromises);
    } catch (error) {
        console.error('Error cleaning up expired cache:', error);
    }
}

async function getValidCachedResponse(cacheName, request) {
    try {
        const cache = await caches.open(cacheName);
        const cachedResponse = await cache.match(request);
        if (!cachedResponse) return null;

        const dateHeader = cachedResponse.headers.get('sw-cache-timestamp');
        if (!dateHeader) return cachedResponse;

        const age = Date.now() - parseInt(dateHeader, 10);
        const ttl = TTL_CONFIG[cacheName] || Infinity;

        if (age > ttl) {
            await cache.delete(request);
            console.log(`Removed expired cache entry: ${request.url}`);
            return null;
        }
        return cachedResponse;
    } catch (error) {
        console.error('Error getting cached response:', error);
        return null;
    }
}

async function cacheWithTimestamp(cacheName, request, response) {
    try {
        const cache = await caches.open(cacheName);
        const responseClone = response.clone();

        const headers = new Headers(responseClone.headers);
        headers.append('sw-cache-timestamp', Date.now().toString());

        const body = await responseClone.blob();
        const responseToCache = new Response(body, {
            status: responseClone.status,
            statusText: responseClone.statusText,
            headers: headers
        });

        await cache.put(request, responseToCache);
        console.log(`Cached: ${request.url} in ${cacheName}`);
    } catch (error) {
        console.error('Error caching response:', error);
    }
}

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(STATIC_ASSETS_CACHE).then((cache) => cache.addAll([OFFLINE_URL]))
    );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => !CACHE_WHITELIST.includes(name))
                    .map((name) => caches.delete(name))
            );
        }).then(() => {
            return Promise.all([
                cleanupExpiredCache(HTML_CACHE_NAME),
                cleanupExpiredCache(API_CACHE_NAME)
            ]);
        }).then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", (event) => {
    const { request } = event;
    const url = new URL(request.url);

    if (request.method !== "GET") return;

    if (isNavigationRSCRequest(request)) {

        event.respondWith(fetch(request));
        return;
    }

    if (!isCacheAllowed(request)) {
        return;
    }

    if (request.headers.get("accept")?.includes("text/html")) {
        event.respondWith(
            (async () => {
                try {
                    const networkResponse = await fetch(request);
                    if (networkResponse.ok && !isNavigationRSCRequest(request)) {
                        await cacheWithTimestamp(HTML_CACHE_NAME, request, networkResponse);
                    }
                    return networkResponse;
                } catch (error) {
                    console.log('Network failed for HTML, trying cache:', error);
                    const validResponse = await getValidCachedResponse(HTML_CACHE_NAME, request);
                    if (validResponse) return validResponse;

                    const offlinePage = await caches.match(OFFLINE_URL);
                    return offlinePage || new Response("Offline", { status: 503 });
                }
            })()
        );
        return;
    }

    if (isApiRequest(url)) {
        event.respondWith(
            (async () => {
                const cachedResponse = await getValidCachedResponse(API_CACHE_NAME, request);

                const fetchPromise = fetch(request).then(async (networkResponse) => {
                    if (networkResponse.status >= 200 && networkResponse.status < 300) {
                        await cacheWithTimestamp(API_CACHE_NAME, request, networkResponse);
                    }
                    return networkResponse.clone();
                }).catch(error => {
                    console.log('Fetch failed:', error);
                    return null;
                });

                if (cachedResponse) {
                    event.waitUntil(fetchPromise);
                    return cachedResponse;
                }

                const networkResponse = await fetchPromise;
                if (networkResponse) {
                    return networkResponse;
                }

                return new Response(JSON.stringify({ error: "offline" }), {
                    status: 503,
                    headers: { "Content-Type": "application/json" }
                });
            })()
        );
        return;
    }

    event.respondWith(
        (async () => {
            const cachedResponse = await caches.match(request);
            if (cachedResponse) return cachedResponse;

            try {
                const networkResponse = await fetch(request);

                if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                    const responseClone = networkResponse.clone();
                    caches.open(STATIC_ASSETS_CACHE).then(cache => {
                        cache.put(request, responseClone);
                    });
                }

                return networkResponse;
            } catch (error) {
                console.log('Static resource fetch failed:', error);
                return new Response("Resource not available", { status: 503 });
            }
        })()
    );
});

self.addEventListener("message", (event) => {
    const { type } = event.data || {};
    if (type === "SKIP_WAITING") self.skipWaiting();
    if (type === "CLEAR_API_CACHE") {
        caches.delete(API_CACHE_NAME).then(() => {
            console.log('API cache cleared');
        });
    }
});