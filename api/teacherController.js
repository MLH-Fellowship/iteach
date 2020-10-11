Teacher = require('./models/teacher');

// Handle index actions: get all
exports.index = function (req, res) { 
    Teacher.get(function (err, teachers) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Teacher retrieved successfully",
            data: teachers
        });
    });
};

// Handle create user actions
exports.new = function (req, res) {
    var teacher = new Teacher({
        _id: req.body._id,
        skill: req.body.skill,
        availability: req.body.availability 
    })
    teacher.save(function (err) {
         if (err)
             res.json(err);
        res.json({
            message: 'New teacher created!',
            data: teacher
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