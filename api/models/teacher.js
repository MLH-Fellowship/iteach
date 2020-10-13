var mongoose = require('mongoose');
// Setup schema
var teacherSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user'
    },
    skill: {
        type: String,
        required: true
    },
    name:{
        type: String,
    },
    surname: {
        type: String
    },
    bio: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        required: true
    },
    availability: [{}],
    schedule: [{}]
});

// Export model

var Teacher = module.exports = mongoose.model('teacher', teacherSchema);
module.exports.get = function (callback, limit) {
    Teacher.find(callback).limit(limit);
}