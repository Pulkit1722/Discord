import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDrJX0o4LgQbYxCz1gHLBZqb4Csu13-eCM",
    authDomain: "discord-clone-live-cbbe2.firebaseapp.com",
    projectId: "discord-clone-live-cbbe2",
    storageBucket: "discord-clone-live-cbbe2.appspot.com",
    messagingSenderId: "91150448470",
    appId: "1:91150448470:web:7e7a4646093c9aa1a008f7",
    measurementId: "G-QTDPRL45PC"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db