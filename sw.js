// Cash Flow PWA service worker.
// Do not cache app pages or user data: every navigation uses the network,
// and financial entries remain in the browser's existing localStorage.
self.addEventListener('install', () => {
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// Firebase Cloud Messaging background push handler.
// No app pages, payments, or private financial data are cached here.
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');
firebase.initializeApp({
  apiKey:'AIzaSyDZIJ7wQMIZnn4RvHh-hUrVSOkT4wvxU1k',
  authDomain:'cash-flow-f98f2.firebaseapp.com',
  projectId:'cash-flow-f98f2',
  messagingSenderId:'1064310364541',
  appId:'1:1064310364541:web:eeb622ccad675af1265414'
});
const cashFlowMessaging=firebase.messaging();
cashFlowMessaging.onBackgroundMessage(payload=>{
  // FCM automatically displays messages with a notification payload.
  // Only display data-only pushes here to prevent duplicate notifications.
  if(payload.notification)return;
  const data=payload.data||{};
  return self.registration.showNotification(data.title||'Cash Flow',{
    body:data.body||'Nové upozornenie',
    icon:'./icon-180.png',
    tag:data.tag||'cashflow-push'
  });
});
self.addEventListener('notificationclick',event=>{
  event.notification.close();
  event.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(windows=>{
    const existing=windows.find(w=>w.url.startsWith(self.registration.scope));
    if(existing)return existing.focus();
    return clients.openWindow(self.registration.scope);
  }));
});
