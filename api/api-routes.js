// api-routes.js
let router = require('express').Router();
let auth =require('./authConfig');

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API is Working',
        message: 'Welcome to zusammen!',
    });
});

// Users
var userController = require('./userController');

router.route('/login').post(userController.loginUser);
router.route('/signup').post(userController.signUpUser);

router.route('/users')
    .get(userController.index)
router.route('/user/:user_id')
    .get(auth.authenticate, userController.getUserDetail)
    .patch(userController.update)
    .put(auth.authenticate, userController.update)
    .delete(userController.delete);


var teacherController = require('./teacherController');
router.route('/teachers')
    .get(teacherController.index)
    .post(teacherController.new);
router.route('/teachers/:teacher_id')
    .get(teacherController.getTeacher);

// Export API routes
module.exports = router;

