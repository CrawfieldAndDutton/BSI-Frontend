importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyAezFN6M6DMRaGvX7gyHDntlokuoJCyIew",
  authDomain: "notifications-d9581.firebaseapp.com",
  projectId: "notifications-d9581",
  storageBucket: "notifications-d9581.firebasestorage.app",
  messagingSenderId: "907676436781",
  appId: "1:907676436781:web:17b49a73c34043b4cc6ba4",
  measurementId: "G-SMFRF9CC0D",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/favicon.ico",
    tag: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
