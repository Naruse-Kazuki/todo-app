// import firebase from 'firebase';

// const config = {
//   projectId: process.env.FIREBASE_PROJECT_ID
// }

import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDy9SwH4OSUzPYxrp7OdR6O080tJXbwmgo",
    authDomain: "todo-app-a4839.firebaseapp.com",
    databaseURL: "https://todo-app-a4839.firebaseio.com",
    projectId: "todo-app-a4839",
    storageBucket: "todo-app-a4839.appspot.com",
    messagingSenderId: "1002723252997",
    appId: "1:1002723252997:web:8e9be0ce2259154711f56c"
  })
}
export default firebase

// if (!firebase.apps.length) {
//   firebase.initializeApp(config)
// }
// export default firebase
