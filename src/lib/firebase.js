import Firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'


const config = { 
    apiKey: "AIzaSyB6XYr_sKhzG1CoQovYGILWmPaqP13kKB0",
    authDomain: "instagram-e9cde.firebaseapp.com",
    projectId: "instagram-e9cde",
    storageBucket: "instagram-e9cde.appspot.com",
    messagingSenderId: "798397034709",
    appId: "1:798397034709:web:37e415ce80ad543eecb25c"
}

const firebase = Firebase.initializeApp(config)
const { FieldValue } = Firebase.firestore

export { firebase, FieldValue }