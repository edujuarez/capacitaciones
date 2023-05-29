// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDbRu_EXiGMvlAqyDtxJgNQPYRsITK_JYI",
    authDomain: "capacitaciones-iselin.firebaseapp.com",
    projectId: "capacitaciones-iselin",
    storageBucket: "capacitaciones-iselin.appspot.com",
    messagingSenderId: "1002762475988",
    appId: "1:1002762475988:web:c8721325fd62639bce5e41",
    measurementId: "G-G33GH3CWFK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { analytics }
