// This is the "Offline page" service worker

// eslint-disable-next-line no-undef
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);

const CACHE = "pwabuilder-page";

// TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";
const offlineFallbackPage = "offline.html";

// eslint-disable-next-line no-restricted-globals
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    // eslint-disable-next-line no-restricted-globals
    self.skipWaiting();
  }
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener("install", async (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.add(offlineFallbackPage))
  );
});

// eslint-disable-next-line no-undef
if (workbox.navigationPreload.isSupported()) {
  // eslint-disable-next-line no-undef
  workbox.navigationPreload.enable();
}

// eslint-disable-next-line no-restricted-globals
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const preloadResp = await event.preloadResponse;

          if (preloadResp) {
            return preloadResp;
          }

          const networkResp = await fetch(event.request);
          return networkResp;
        } catch (error) {
          const cache = await caches.open(CACHE);
          const cachedResp = await cache.match(offlineFallbackPage);
          return cachedResp;
        }
      })()
    );
  }
});


//Push Message 수신 이벤트
// eslint-disable-next-line no-restricted-globals
self.addEventListener('push', function (event)
{
    console.log('[ServiceWorker] 푸시알림 수신: ', event);

    //Push 정보 조회
    const title = event.data.title || '알림';
    const body = event.data.body;
    const icon = event.data.icon || './Images/512x512.png'; //512x512
    const badge = event.data.badge || '/Images/192x192.png'; //128x128
    const options = {
        body: body,
        icon: icon,
        badge: badge
    };

    //Notification 출력
    event.waitUntil(self.registration.showNotification(title, options));
});

//사용자가 Notification을 클릭했을 때
// eslint-disable-next-line no-restricted-globals
self.addEventListener('notificationclick', function (event)
{
    console.log('[ServiceWorker] 푸시알림 클릭: ', event);

    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: "window" })
            .then(function (clientList)
            {
                //실행된 브라우저가 있으면 Focus
                for (let i = 0; i < clientList.length; i++)
                {
                    let client = clientList[i];
                    if (client.url === '/' && 'focus' in client)
                        return client.focus();
                }
                //실행된 브라우저가 없으면 Open
                if (clients.openWindow)
                    return clients.openWindow('https://localhost:3000/');
            })
    );
});
