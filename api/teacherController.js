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

// Handle create user actions
exports.new = function (req, res) {
  
    User.findById(req.body._id, function (err, user) {
        if (err) {
            console.log(err);   
        }
        var teacher = new Teacher({
            _id: req.body._id,
            skill: req.body.skill,
            name: user.name,
            surname: user.surname,
            bio: user.bio
        });
        teacher.save(function (err) {
             if (err)
                 res.json(err);
            res.status(200).send(teacher);
        });
    });
    
};

