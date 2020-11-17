import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA7hMdYbHq_AqbBa7gnLz0qLndGtR2ZZkU",
  authDomain: "chat-app-63c7d.firebaseapp.com",
  databaseURL: "https://chat-app-63c7d.firebaseio.com",
  projectId: "chat-app-63c7d",
  storageBucket: "chat-app-63c7d.appspot.com",
  messagingSenderId: "349139648155",
  appId: "1:349139648155:web:cee7f5b2d490047b7d103e"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;