import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyChqyP8dGCouQntKVq1kAp-iSv0CHfAXK0",
  authDomain: "netflix-build-a70e6.firebaseapp.com",
  databaseURL: "https://netflix-build-a70e6-default-rtdb.firebaseio.com",
  projectId: "netflix-build-a70e6",
  storageBucket: "netflix-build-a70e6.appspot.com",
  messagingSenderId: "565183916006",
  appId: "1:565183916006:web:d676486db4adca15a89827"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };