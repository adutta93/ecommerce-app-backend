require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const APP_SECRET = process.env.APP_SECRET;

const GenereteSalt = async () => {
	return await bcrypt.genSalt();
};

const GeneretePassword = async (password, salt) => {
	return await bcrypt.hash(password, salt);
};

const ValidatePassword = async (enteredPassword, savedPassword, salt) => {
	return (await GeneretePassword(enteredPassword, salt)) === savedPassword;
};

const GenerateSignature = async (payload) => {
	return await jwt.sign(payload, APP_SECRET, { expiresIn: '10d' });
};

const ValidateSignature = async (req) => {
	if (req.headers.authorization) {
		const token = req.headers.authorization.split(' ')[1];
		const user = jwt.verify(token, APP_SECRET);
		req.user = user;
		return true;
	}
	return false;
};
module.exports = { GenereteSalt, GeneretePassword, ValidatePassword, GenerateSignature, ValidateSignature };
