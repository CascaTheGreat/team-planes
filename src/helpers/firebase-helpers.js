import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAAwibxs8DtoawXB2jG2tKcpl9rDjCb-Lc",
  authDomain: "flights-of-the-future.firebaseapp.com",
  projectId: "flights-of-the-future",
  storageBucket: "flights-of-the-future.appspot.com",
  messagingSenderId: "806181340414",
  appId: "1:806181340414:web:2a1a044759e666924a91af",
};

const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
