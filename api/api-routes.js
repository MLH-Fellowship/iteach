// api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API is Working',
        message: 'Welcome to zusammen!',
    });
});


const {
    loginUser,
    signUpUser
} = require('./auth');

// Users

router.route('/login').post(loginUser);
router.route('/signup').post(signUpUser);

// Import user controller
var userController = require('./userController');
// Contact routes
router.route('/users')
    .get(userController.index)
    .post(userController.new);
router.route('/user/:user_id')
    .get(userController.getUserDetail)
    .patch(userController.update)
    .put(userController.update)
    .delete(userController.delete);
// Export API routes
module.exports = router;

