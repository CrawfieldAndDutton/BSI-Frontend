importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js')

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: 'xxxx',
  authDomain: 'xxx',
  projectId: 'xxx',
  storageBucket: 'xxx',
  messagingSenderId: 'xxx',
  appId: 'xxx',
  measurementId: 'xxx'
})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  // Customize notification here
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/favicon.ico',
    tag: payload.notification.body,
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
