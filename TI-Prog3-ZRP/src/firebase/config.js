import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAqMFSXafyO_P6CQASoUtwQ1uo07hg6KXE",
  authDomain: "ti-prog3-zrp-75e37.firebaseapp.com",
  projectId: "ti-prog3-zrp-75e37",
  storageBucket: "ti-prog3-zrp-75e37.firebasestorage.app",
  messagingSenderId: "949725724648",
  appId: "1:949725724648:web:d38f173491fd880d312e5d"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();