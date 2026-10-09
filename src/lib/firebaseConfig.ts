import { initializeApp } from "firebase/app";

export const firebaseConfig = {
  projectId: "npcforgeproject",
  appId: "1:754476221869:web:63be444274a01fd9c44d24",
  storageBucket: "npcforgeproject.firebasestorage.app",
  apiKey: "AIzaSyCpKCvrJb9pcs2DosGe2Vu3boUc_Ix6aJ8",
  authDomain: "npcforgeproject.firebaseapp.com",
  messagingSenderId: "754476221869",
};

export const firebaseApp = initializeApp(firebaseConfig);
