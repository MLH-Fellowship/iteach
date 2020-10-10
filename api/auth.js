let config = require('./config/firebase');
const firebase = require('firebase');
firebase.initializeApp(config);
User = require('./models/user');

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
    var tokenDB, userId;
    firebase
    .auth()
    .createUserWithEmailAndPassword(request.body.email, request.body.password)
    .then((data) => {
        userId = data.user.uid;
        return data.user.getIdToken();
    })
    .then((token) => {
        tokenDB = token;
        var user = new User({
            email: request.body.email,
            name: request.body.name,
            surname: request.body.surname,
            bio: request.body.bio,
            profilePicture: request.body.profilePicture,
            uid: userId //firebase id
                });
        user.save();
    })
    .then(()=>{
        return response.status(201).json({ tokenDB });
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