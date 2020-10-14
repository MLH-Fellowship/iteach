const teacher = require('./models/teacher');

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
  // getDay(): 0 for Sunday, 1 for Monday, 2 for Tuesday, 3 for Wed
    console.log("getTeacher");
    Teacher.findById(req.params.teacher_id, function(err, teacher) {
            if (err)
                res.send(err);
        res.send(teacher);
    });
};

exports.updateTeacher = function (req, res) {
    console.log("updateTeacher");
    Teacher.findById(req.params.teacher_id, function (err, teacher) {
        if (err)
            res.send(err);
        console.log("schedule"+JSON.stringify(req.body.schedule))
        teacher.schedule = req.body.schedule;
// save the user and check for errors
        teacher.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Booking added',
                data: teacher
            });
        });
    });
}

exports.new = function (req, res) {  
    console.log("req"+JSON.stringify(req.body));
    User.findById(req.body._id, function (err, user) {
        if (err) {
            console.log(err);   
        }

        const scheduleArray = [{}];
        if (req.body.availability) {
        req.body.availability.map((slot) => {
            var start = new Date();
            start.setMinutes(0);
            start.setSeconds(0);
            start.setMilliseconds(0);
            var end = new Date();
            end.setDate(end.getDate() + 14);
            for (;start < end; start.setHours(start.getHours()+1)) {
              if (start.getDay()===slot.day && start.getHours()==slot.hour) {
                let newDate = new Object();
                newDate.date = new Date(start);
                newDate.booked = false;
                scheduleArray.push(newDate);
              }
          }
          })
        }

        var teacher = new Teacher({
            _id: req.body._id,
            skill: req.body.skill,
            availability: req.body.availability,
            schedule: scheduleArray,
            bio: req.body.bio,
            profilePicture: req.body.profilePicture,
            name: user.name,
            surname: user.surname,
        });

       
        teacher.save(function (err) {
             if (err)
                res.status(500).send({errors: { general: 'Something went wrong, please try again'  }});
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
            "hour": 23,

    },
    {
        "day": 0,
        "hour": 11,

    }
    ]

}

*/


