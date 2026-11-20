// Cash Flow PWA service worker.
// Do not cache app pages or user data: every navigation uses the network,
// and financial entries remain in the browser's existing localStorage.
self.addEventListener('install', () => {
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});
