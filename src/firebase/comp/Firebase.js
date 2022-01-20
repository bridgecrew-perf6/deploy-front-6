import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCed1cnquFO1gAObfjuaegsrGVDXa57NY8",
    authDomain: "hiuerhfs.firebaseapp.com",
    projectId: "hiuerhfs",
    storageBucket: "hiuerhfs.appspot.com",
    messagingSenderId: "60781539582",
    appId: "1:60781539582:web:9104f111c9b8364027b5af"
  };
  
  // Initialize Firebase
  // eslint-disable-next-line
  const app = firebase.initializeApp(firebaseConfig);

  const hiji = firebase.storage() ;
  const h = firebase.firestore();

  export  {hiji,h}