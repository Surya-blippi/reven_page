import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBNSV1m2QpTX72ODmvFSunx5vxM-z19HNo",
  authDomain: "reven-app.firebaseapp.com",
  projectId: "reven-app",
  storageBucket: "reven-app.firebasestorage.app",
  messagingSenderId: "721615973355",
  appId: "1:721615973355:web:5b8637fefa2714546987ae",
  measurementId: "G-S5YSLGVFX5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);