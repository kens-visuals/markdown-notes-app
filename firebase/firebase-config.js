// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';

// FIXME: Replace with .env values
const firebaseConfig = {
  apiKey: 'AIzaSyBireh2ZNA1YCuNfq4m-bDYAFxc8-RNkZ8',
  authDomain: 'test-47f15.firebaseapp.com',
  projectId: 'test-47f15',
  storageBucket: 'test-47f15.appspot.com',
  messagingSenderId: '175669380169',
  appId: '1:175669380169:web:e17e6de85091372c5d6b98',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// NOTE: uncomment later
// let the user choose the account everytime they sign in
// googleProvider.setCustomParameters({ prompt: 'select_account' });
