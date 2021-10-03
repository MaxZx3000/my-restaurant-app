import 'regenerator-runtime';
import ServiceWorkerController from './controller/service-worker-controller.js';
import ApiEndpoint from './globals/api-endpoint.js';
const {assets} = global.serviceWorkerOption;
const onlineAssets = [
  './images/hero-image_2-large.webp',
  './images/hero-image_2-small.webp',
  ApiEndpoint.NO_RESRAURANT_DATA_IMAGE,
];

self.addEventListener('install', (event) => {
  console.log('Installing Service Worker...');
  event.waitUntil(ServiceWorkerController.cachingAppShell([...assets, ...onlineAssets, './']));
});

self.addEventListener('activate', (event) => {
  console.log('Activate Service Worker...');
  event.waitUntil(ServiceWorkerController.deleteOldCache());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(ServiceWorkerController.fetchRequest(event));
});
