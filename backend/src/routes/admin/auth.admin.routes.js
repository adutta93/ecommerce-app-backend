const express = require('express');
const { signup, signin, isSignedIn } = require('../../controller/admin/auth.admin.controller');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../../validator/auth.validator');
const router = express.Router();

router.post('/admin/signup', validateSignupRequest, isRequestValidated, signup);
router.post('/admin/signin', validateSigninRequest, isRequestValidated, signin);

router.post('/admin/profile', isSignedIn, (req, res) => {
	res.status(200).json({ user: 'profile' });
});

module.exports = router;
