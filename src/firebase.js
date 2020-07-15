import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"
import "firebase/storage"

var firebaseConfig = {
    apiKey: "AIzaSyBp_GhPMJaYtuL8PTIIkDti1EvR9wgZesA",
    authDomain: "react-slack-messaging.firebaseapp.com",
    databaseURL: "https://react-slack-messaging.firebaseio.com",
    projectId: "react-slack-messaging",
    storageBucket: "react-slack-messaging.appspot.com",
    messagingSenderId: "562479815191",
    appId: "1:562479815191:web:88a1430127f8fb323b5a52"
  };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase