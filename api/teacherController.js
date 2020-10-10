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
    var teacher = new Teacher();
    teacher._id = req.body._id;
    teacher.skill = req.body.skill;

    teacher.save(function (err) {
         if (err)
             res.json(err);
res.json({
            message: 'New teacher created!',
            data: teacher
        });
    });
};