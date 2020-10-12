var mongoose = require('mongoose');
// Setup schema
var userSchema = mongoose.Schema({
    email: {
        type: String
    },
    uid: { //firebase id
        type: String 
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
    },
    bio: {
        type: String
    },
    profilePicture: {
        type: String
    }
});

// Export model
var User = module.exports = mongoose.model('user', userSchema);
module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}