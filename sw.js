const cacheName = "aymenn.xyz";
const assets = [
	'./',
	'./index.html',
	'./assets/css/style.min.css',
	'./assets/js/main.min.js',
	'./favicon.ico'
];
self.addEventListener('activate', e => {
	e.waitUntil(caches.keys().then(keyList => keyList.map(key => {
		if (key !== cacheName)
			return caches.delete(key);
	})));
	self.clients.claim();
});
self.addEventListener('install', e => {
	e.waitUntil(caches.open(cacheName).then(cache => cache.addAll(assets).then(() => self.skipWaiting())));
});
self.addEventListener('fetch', e => {
	e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
})