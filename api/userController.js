User = require('./models/user');
const auth = require('./auth');

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

// Handle create user actions
exports.new = function (req, res) {
    var user = new User(req.body);

    //gets the user id token 
    /*firebaseRef.auth().currentUser.getIdToken(true).then(function(idToken) {
        User._id=idToken;
      }).catch(function(error) {
            res.status(500).send(error);
      });
*/
    try {
        user.save();
        res.send(user);
    } catch (err) {
        res.status(500).send(err);
    }
};


// Handle view user info
exports.view = function (req, res) {
    User.findById(req.params._id, function (err, user) {
        if (err)
            res.send(err);
        res.json({
            message: 'User details loading..',
            data: user
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