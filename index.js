// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { DataStructure } from "./modules/dataStructure";
import { Percentile } from "./modules/percentile";
import { DataConverter } from "./modules/decode";

const firebaseConfig = {
  apiKey: "AIzaSyAO1aIe_fTZB6duj8YIRyYcLTINlcP196w",
  authDomain: "escouting-7b4e0.firebaseapp.com",
  databaseURL: "https://escouting-7b4e0-default-rtdb.firebaseio.com",
  projectId: "escouting-7b4e0",
  storageBucket: "escouting-7b4e0.appspot.com",
  messagingSenderId: "377179821867",
  appId: "1:377179821867:web:cedab35ab708c12986976e",
  measurementId: "G-8VWYRF9QY6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let data = new DataStructure()
console.log(data.getDataLabel(0));
