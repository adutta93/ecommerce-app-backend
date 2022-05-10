const express = require('express');
const { signup, signin, isSignedIn } = require('../../controller/admin/auth.admin.controller');
// const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validators/auth');
const router = express.Router();

router.post('/admin/signup', signup);
router.post('/admin/signin', signin);

router.post('/admin/profile', isSignedIn, (req, res) => {
	res.status(200).json({ user: 'profile' });
});

module.exports = router;
