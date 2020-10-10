let config = require('./config/firebase');
var admin = require('firebase-admin');
admin.initializeApp(config);
module.exports.admin = admin;
let User = require('./models/user');


module.exports.authenticate = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer', '').trim()   
       admin.auth().verifyIdToken(token)
      .then(function (decodedToken) {
        User.findById(req.params.user_id, function (err, user) {
            if (user.uid==decodedToken.uid) {    
                req.user = user.uid
                return next()
            }
            else 
                res.status(500).send("invalid token.");

        })
       }).catch(function (error) {
        res.status(500).send(error);
       });
    };

    


