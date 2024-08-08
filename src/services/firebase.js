import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, getDownloadURL, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCWReDRCN3szdhefs9PshevaAYEMgximjA",
  authDomain: "fisk-events-board.firebaseapp.com",
  projectId: "fisk-events-board",
  storageBucket: "fisk-events-board.appspot.com",
  messagingSenderId: "316693740020",
  appId: "1:316693740020:web:9deb54efed4aa06ea9e1a1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);

export const fetchImageURLFromStorage = async (src) => {
  const imageRef = ref(storage, src);
  return await getDownloadURL(imageRef);
};