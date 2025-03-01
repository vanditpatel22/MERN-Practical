const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth_controller');


router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.post('/verify_email', authController.verifyEmail);


module.exports = router;