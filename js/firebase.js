import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBeZRuHMZZCkzP4JkQDxMIao1anYnLQh0c",
  authDomain: "sign-up-3366c.firebaseapp.com",
  projectId: "sign-up-3366c",
  storageBucket: "sign-up-3366c.firebasestorage.app",
  messagingSenderId: "928113525807",
  appId: "1:928113525807:web:8ce0c642626cb7bfeff2da"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
