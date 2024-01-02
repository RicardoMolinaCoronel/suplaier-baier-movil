import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// y otros servicios que necesites

const firebaseConfig = {
    apiKey: "AIzaSyCuSJegyFdyxeWhfXPwLvgjBNgfBNhU3Lo",
    authDomain: "baiernotificaciones.firebaseapp.com",
    projectId: "baiernotificaciones",
    storageBucket: "baiernotificaciones.appspot.com",
    messagingSenderId: "572057812194",
    appId: "1:572057812194:android:95e01a2457f153eb7ef2bb",
  };
  
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // Si ya está inicializada, usa esa instancia.
  }
  
export default firebase;