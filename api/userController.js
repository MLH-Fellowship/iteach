User = require('./models/user');

let config = require('./config/firebase');
const firebase = require('firebase');
firebase.initializeApp(config);

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
    var user;
    firebase
    .auth()
    .createUserWithEmailAndPassword(request.body.email, request.body.password)
    .then((data) => {
        userId = data.user.uid;
        return data.user.getIdToken();
    })
    .then((token) => {
        tokenDB = token;
        user = new User({
            email: request.body.email,
            name: request.body.name,
            surname: request.body.surname,
            bio: request.body.bio,
            profilePicture: request.body.profilePicture,
            uid: userId //firebase id
                });
        
    })
    .then(()=>{
        user.save();
        return response.status(201).json({ tokenDB });
    })
    .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
            return response.status(400).json({ email: 'Email already in use' });
        } else {
            return response.status(500).json({ general: 'Something went wrong, please try again' });
        }
    })
}

exports.getUserDetail = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);        
        res.json({
            message: 'User details loading..',
            data: user
        });
    });
};


// Handle index actions: get all users
exports.index = function (req, res) { 
    User.get(function (err, users) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Users retrieved successfully",
            data: users
        });
    });
};



// Handle update user info
exports.update = function (req, res) {
User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);
        user.name = req.body.name;
// save the user and check for errors
        user.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'User Info updated',
                data: user
            });
        });
    });
};
// Handle delete user
exports.delete = function (req, res) {
    User.remove({
        _id: req.params.user_id
    }, function (err, user) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'User deleted'
        });
    });
};