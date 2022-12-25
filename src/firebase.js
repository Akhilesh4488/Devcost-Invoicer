import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"; 

export const firebaseConfig = {
    apiKey: "AIzaSyDnYN3WYPChJSkkZOHthW_ntqSkbkoMZWI",
    authDomain: "devcost---invoice.firebaseapp.com",
    projectId: "devcost---invoice",
    storageBucket: "devcost---invoice.appspot.com",
    messagingSenderId: "904477125727",
    appId: "1:904477125727:web:8ebdc0f47fc629283e7fea"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()