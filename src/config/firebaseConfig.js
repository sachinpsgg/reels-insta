import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDFMfhCIy8M5gOwGEg4tVNFbR4mV9mPrXw",
    authDomain: "insta-reels-clone-c41a9.firebaseapp.com",
    projectId: "insta-reels-clone-c41a9",
    storageBucket: "insta-reels-clone-c41a9.firebasestorage.app",
    messagingSenderId: "712373936525",
    appId: "1:712373936525:web:363f61c6a7c3ca69ac5dc4",
    measurementId: "G-XTSXG2ZXSJ"
};

const app = initializeApp(firebaseConfig);


const db = getFirestore(app);

export { db };
