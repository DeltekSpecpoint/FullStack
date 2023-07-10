import firebase from 'firebase/app'
import 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBa1a1hTCBSNClbESunU1PqAddBhk6zEnw',
  authDomain: 'react-firebase-37768.firebaseapp.com',
  projectId: 'react-firebase-37768',
  storageBucket: 'react-firebase-37768.appspot.com',
  messagingSenderId: '787205293802',
  appId: '1:787205293802:web:9a0fd3308898ac9f393993',
  measurementId: 'G-KEML7SLDV8',
}

firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()
