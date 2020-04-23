import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = { timestampsInSnapshots: true };

const config = {
    apiKey: "AIzaSyBQQKd5f0hG1levaxnbuAd5o_8d-PYXWNs",
    authDomain: "reactjs-crud-b17d7.firebaseapp.com",
    databaseURL: "https://reactjs-crud-b17d7.firebaseio.com",
    projectId: "reactjs-crud-b17d7",
    storageBucket: "reactjs-crud-b17d7.appspot.com",
    messagingSenderId: "272602670721",
    appId: "1:272602670721:web:b3a1d0e1b775b0a2050f80",
    measurementId: "G-JZL7Z0GXY0"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;