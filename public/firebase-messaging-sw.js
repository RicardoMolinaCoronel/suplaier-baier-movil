// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseConfig = {
  apiKey: "AIzaSyD46ct3rYTaeaG8y13_8faVo7zMOHgp0qo",
  authDomain: "contabillyapp.firebaseapp.com",
  projectId: "contabillyapp",
  storageBucket: "contabillyapp.appspot.com",
  messagingSenderId: "690734377975",
  appId: "1:690734377975:web:0e0d76de67a714c0f81cf2"
};

firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.message,
    icon: "suplaier_logo degradado.png"
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  )
})