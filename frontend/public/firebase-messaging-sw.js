importScripts(
  'https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js'
);

const firebaseConfig = {
  apiKey: 'AIzaSyAptfb7eJZmJ5FJ1f4KHzBg5T1dEAO8t00',
  authDomain: 'smiletogether-7f133.firebaseapp.com',
  projectId: 'smiletogether-7f133',
  storageBucket: 'smiletogether-7f133.firebasestorage.app',
  messagingSenderId: '539498288848',
  appId: '1:539498288848:web:36ddde5a11a144c492f0d5',
  measurementId: 'G-6K3NH8TJKK',
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
