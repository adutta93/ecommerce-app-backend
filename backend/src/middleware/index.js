require('dotenv').config();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const { ValidateSignature } = require('../utility/PasswordUtility');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(path.dirname(__dirname), 'uploads'));
	},
	filename: function (req, file, cb) {
		cb(null, shortid.generate() + '-' + file.originalname);
	},
});

const accessKeyId = process.env.accessKeyId;
const secretAccessKey = process.env.secretAccessKey;

const s3 = new aws.S3({
	accessKeyId,
	secretAccessKey,
});

exports.upload = multer({ storage });

exports.uploadS3 = multer({
	storage: multerS3({
		s3: s3,
		bucket: 'flipkart-clone-app',
		acl: 'public-read',
		metadata: function (req, file, cb) {
			cb(null, { fieldName: file.fieldname });
		},
		key: function (req, file, cb) {
			cb(null, shortid.generate() + '-' + file.originalname);
		},
	}),
});

exports.isSignedIn = (req, res, next) => {
	// if (req.headers.authorization) {
	// 	const token = req.headers.authorization.split(' ')[1];
	// 	const user = jwt.verify(token, process.env.APP_SECRET);
	// 	req.user = user;
	// } else {
	// 	return res.status(400).json({ message: 'Authorization required' });
	// }
	const isSignatureValidated = ValidateSignature(req);
	if (!isSignatureValidated) {
		return res.status(400).json({ message: 'Authorization required' });
	}
	next();
	//jwt.decode()
};

// exports.userMiddleware = (req, res, next) => {
// 	const role = req.user.role;
// 	if (role !== 'user') {
// 		return res.status(400).json({ message: 'User access denied' });
// 	}
// 	next();
// };

exports.adminMiddleware = (req, res, next) => {
	const role = req.user.role;
	if (role !== 'admin' || role !== 'super-admin') {
		next();
	} else {
		return res.status(400).json({ message: 'Admin access denied' });
	}
};

exports.superAdminMiddleware = (req, res, next) => {
	if (req.user.role === 'super-admin') {
		next();
	} else {
		return res.sendStatus(200).json({ message: 'Super Admin access denied' });
	}
};
