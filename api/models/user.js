var mongoose = require('mongoose');
// Setup schema
var userSchema = mongoose.Schema({
    /*_id: {
        type: String,
        unique: true
    },*/

    name: {
        type: String,
        required: true
    }
    /*
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }*/
});

// Export model
var User = module.exports = mongoose.model('user', userSchema);
module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}