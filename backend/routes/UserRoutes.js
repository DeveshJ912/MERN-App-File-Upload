const express = require('express');
router = express.Router();

const userController = require('../controllers/UserController');
router.route('/registerUser').post(userController.signUp);
router.route('/login').post(userController.login);
router.route('/uploadImage').patch(userController.uploadImage);


module.exports = router;
