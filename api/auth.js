const firebase = require('firebase');

  // Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyA78W6VQComOdDam36Hukl0jca_jkx238U",
    authDomain: "zusammen-83794.firebaseapp.com",
    databaseURL: "https://zusammen-83794.firebaseio.com",
    projectId: "zusammen-83794",
    storageBucket: "zusammen-83794.appspot.com",
    messagingSenderId: "470554307038",
    appId: "1:470554307038:web:9c97f4bcc09533fffbd54f",
    measurementId: "G-TE71CT4LQY"
  };
  exports.firebase = firebase.initializeApp(firebaseConfig);

// Login
exports.loginUser = (request, response) => {
    firebase
        .auth()
        .signInWithEmailAndPassword(request.body.email, request.body.password)
        .then((data) => {
            return data.user.getIdToken();
        })
        .then((token) => {
            return response.json({ token });
        })
        .catch((error) => {
            console.error(error);
            return response.status(403).json({ general: 'wrong credentials, please try again'});
        })
};

exports.signUpUser = (request, response) => {
    firebase
    .auth()
    .createUserWithEmailAndPassword(request.body.email, request.body.password)
    .then((data) => {
        return data.user.getIdToken();
    })
    .then((token) => {
        return response.json({ token });
    })
    .catch((error) => {
        console.error(error);
        if (error.code === 'auth/email-already-in-use') {
            return response.status(400).json({ email: 'Email already in use' });
        } else {
            return response.status(500).json({ general: 'Something went wrong, please try again' });
        }
    })
}