User = require('./models/user');

let config = require('./config/firebase');
const firebase = require('firebase');
firebase.initializeApp(config);


process.on('unhandledRejection', function(err) {
    console.log(err);
});

// Login
exports.loginUser = (request, response) => {
    firebase
        .auth()
        .signInWithEmailAndPassword(request.body.user.email, request.body.user.password)
        .then((data) => {
            return data.user.getIdToken();
        })
        .then((token) => {
            return response.status(200).send({user: {token: token}})
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
    .createUserWithEmailAndPassword(request.body.user.email, request.body.user.password)
    .then((data) => {
        userId = data.user.uid;
        return data.user.getIdToken();
    })
    /*
    .catch(function(error){
        console.log(error);
    })*/
    .then((token) => {
        tokenDB = token;
        user = new User({
            email: request.body.user.email,
            name: request.body.user.name,
            surname: request.body.user.surname,
            uid: userId //firebase id
                });
        
    })
    .catch(function(error) {
        console.log(error);
        return response.status(500).json({ general: 'Something went wrong, please try again' });

    })
    .then(()=>{
        user.save();
        return response.status(201).send({user: {token: tokenDB}})
    })
    .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
            return response.status(400).send({errors: { email: 'Email already in use' }});
        } else {
            return response.status(500).send({errors: { general: 'Something went wrong, please try again'  }});
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
        user.surname = req.body.surname
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