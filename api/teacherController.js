Teacher = require('./models/teacher');
User = require('./models/user');
// Handle index actions: get all
exports.index = function (req, res) { 
    Teacher.get(function (err, teachers) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.status(200).send(teachers);
    });
};

exports.getTeacher = function (req, res) {

    console.log("getTeacher");
    Teacher.findById(req.params.teacher_id, function(err, teacher) {
        if (err)
            res.send(err);
        console.log("getTeacher"+teacher);
        res.send(teacher);
    });
};



// Handle create user actions
exports.new = function (req, res) {  
    User.findById(req.body._id, function (err, user) {
        if (err) {
            console.log(err);   
        }
        var teacher = new Teacher({
            _id: req.body._id,
            skill: req.body.skill,
            availability: req.body.availability,
            bio: req.body.bio,
            profilePicture: req.body.profilePicture,
            name: user.name,
            surname: user.surname,
        });
        teacher.save(function (err) {
             if (err)
                 res.json(err);
            res.status(200).send(teacher);
        });
    });
    
};


//example request
/*
{
    "_id": "5f80e2e175b4275c185c30c4",
    "skill": "English",
    "availability": [
        {
            "day": 0,
            "hour": 23

    },
    {
        "day": 0,
        "hour": 11
    }
    ]

}

*/


