import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

const firebaseConfig = {

  apiKey: "AIzaSyDo93SvVLc_ju86VdvaB-Xq1mVjAMNCFYY",

  authDomain: "foxconn-materials-v1.firebaseapp.com",

  projectId: "foxconn-materials-v1",

  storageBucket: "foxconn-materials-v1.firebasestorage.app",

  messagingSenderId: "365531529349",

  appId: "1:365531529349:web:d47c59f6739bbe9c73a9ec",

  measurementId: "G-RP048EPWBF"

};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage(app);