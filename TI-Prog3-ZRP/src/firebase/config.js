import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBmHxq8UuSY4c3d2To0c__w4KtgevzDcR0",
    authDomain: "ti-prog3-zrp.firebaseapp.com",
    projectId: "ti-prog3-zrp",
    storageBucket: "ti-prog3-zrp.firebasestorage.app",
    messagingSenderId: "957249261616",
    appId: "1:957249261616:web:495a063d2c94059901ddf5"
  };

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
