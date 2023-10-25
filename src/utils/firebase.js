import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCWReDRCN3szdhefs9PshevaAYEMgximjA",
  authDomain: "fisk-events-board.firebaseapp.com",
  projectId: "fisk-events-board",
  storageBucket: "fisk-events-board.appspot.com",
  messagingSenderId: "316693740020",
  appId: "1:316693740020:web:9deb54efed4aa06ea9e1a1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
