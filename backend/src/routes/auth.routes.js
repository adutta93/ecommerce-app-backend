const express = require('express');
const { signup, signin, isSignedIn } = require('../controller/auth.controller');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validator/auth.validator');
const router = express.Router();

router.post('/signup', validateSignupRequest, isRequestValidated, signup);
router.post('/signin', validateSigninRequest, isRequestValidated, signin);

router.post('/profile', isSignedIn, (req, res) => {
	res.status(200).json({ user: 'profile' });
});

module.exports = router;
