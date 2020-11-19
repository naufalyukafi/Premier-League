importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

  const CACHE_NAME = 'football-apps-v3';
  const API_URL = 'https://api.football-data.org/v2/';

  workbox.precaching.precacheAndRoute([
  '/',
  '/index.html',
  '/nav.html',
  '/teams.html',
  '/manifest.json',
  '/push.js',
  '/css/materialize.min.css',
  '/css/style.css',
  '/js/api.js',
  '/js/materialize.min.js',
  '/js/nav.js',
  '/js/db.js',
  '/js/idb.js',
  '/pages/home.html',
  '/pages/team.html',
  '/pages/saved.html',
  '/icon/icon-192x192.png',
  '/icon/icon-256x256.png',
  '/icon/icon-384x384.png',
  '/icon/icon-512x512.png',
  'https://cdn.rawgit.com/michalsnik/aos/2.1.1/dist/aos.css',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://cdn.rawgit.com/michalsnik/aos/2.1.1/dist/aos.js',
  'https://unpkg.com/snarkdown@1.0.2/dist/snarkdown.umd.js',
  "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2"
], 
  {
    ignoreUrlParametersMatching: [/.*/]
  }
);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'pages'
  })
);

workbox.routing.registerRoute(
  new RegExp('/teams.html'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'team-page'
  })
);

workbox.routing.registerRoute(
  new RegExp(API_URL),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'apiCache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
      })
    ]
  })
);





// const CACHE_NAME = 'football-apps-v2'

// const urlsToCache = [
  // '/',
  // '/index.html',
  // '/nav.html',
  // '/teams.html',
  // '/manifest.json',
  // '/push.js',
  // '/css/materialize.min.css',
  // '/css/style.css',
  // '/js/api.js',
  // '/js/materialize.min.js',
  // '/js/nav.js',
  // '/js/db.js',
  // '/js/idb.js',
  // '/pages/home.html',
  // '/pages/team.html',
  // '/pages/saved.html',
  // '/icon/icon-192x192.png',
  // '/icon/icon-256x256.png',
  // '/icon/icon-384x384.png',
  // '/icon/icon-512x512.png',
  // 'https://cdn.rawgit.com/michalsnik/aos/2.1.1/dist/aos.css',
  // 'https://fonts.googleapis.com/icon?family=Material+Icons',
  // 'https://cdn.rawgit.com/michalsnik/aos/2.1.1/dist/aos.js',
  // 'https://unpkg.com/snarkdown@1.0.2/dist/snarkdown.umd.js',
  // "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2"
// ]

// self.addEventListener('install', function (event) {
//   self.skipWaiting()
//   event.waitUntil(
//     caches.open(CACHE_NAME).then(function (cache) {
//       return cache.addAll(urlsToCache)
//     })
//   )
// })

// self.addEventListener('activate', function (event) {
//   event.waitUntil(
//     caches.keys().then(function (cacheNames) {
//       return Promise.all(
//         cacheNames.map(function (cacheName) {
//           if (cacheName !== CACHE_NAME) {
//             console.log('ServiceWorker: cache ' + cacheName + ' dihapus')
//             return caches.delete(cacheName)
//           }
//         })
//       )
//     })
//   )
// })

// self.addEventListener('fetch', function (event) {
//   const base_url = 'https://api.football-data.org/v2/'
//   if (event.request.url.indexOf(base_url) > -1) {
//     event.respondWith(
//       caches.open(CACHE_NAME).then(function (cache) {
//         return fetch(event.request).then(function (response) {
//           cache.put(event.request.url, response.clone())
//           return response
//         })
//       })
//     )
//   } else {
//     event.respondWith(
//       caches
//         .match(event.request, { ignoreSearch: true })
//         .then(function (response) {
//           return response || fetch(event.request)
//         })
//     )
//   }
// })

self.addEventListener('push', function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'icon/icon-192x192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
