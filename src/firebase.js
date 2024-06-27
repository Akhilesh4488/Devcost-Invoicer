import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"; 

export const firebaseConfig = {
    apiKey: "",
    authDomain: "devcost---invoice.firebaseapp.com",
    projectId: "devcost---invoice",
    storageBucket: "devcost---invoice.appspot.com",
    messagingSenderId: "",
    appId: ""
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
