const User = require('../../models/user.model');
const shortid = require('shortid');
const { FindUser } = require('../../utility/UserUtility');
const {
	GenereteSalt,
	GeneretePassword,
	GenerateSignature,
	ValidateSignature,
} = require('../../utility/PasswordUtility');

/**
 *
 * ! Add user
 * * Post req
 */

exports.signup = async (req, res) => {
	const { firstName, lastName, email, password } = req.body;
	const UserExist = await FindUser('', email);

	if (UserExist) {
		return res.status(409).json({ message: 'Admin already exists' });
	}
	// generate salts
	const salt = await GenereteSalt();
	const hash_password = await GeneretePassword(password, salt);
	const _createUser = await User.create({
		firstName,
		lastName,
		email,
		hash_password,
		username: shortid.generate(),
		role: 'admin',
	});
	return res.json({
		_createUser,
	});
};

/**
 *
 * ! User Log in
 * * Post req
 */

exports.signin = async (req, res) => {
	const { email, password } = req.body;
	const UserExist = await FindUser('', email);
	if (!UserExist) {
		return res.status(400).json({
			message: 'Admin dose not exists',
		});
	} else {
		const isPassword = await UserExist.authenticate(password);
		if (isPassword) {
			if (!UserExist.role === 'admin' || !UserExist.role === 'super-admin') {
				return res.status(400).json({
					message: 'Youre not an admin',
				});
			}
			const token = await GenerateSignature({ _id: UserExist._id, role: UserExist.role });
			const { _id, firstName, lastName, email, role, fullName } = UserExist;
			res.cookie('token', token, { expiresIn: '10d' });
			res.status(200).json({
				token,
				user: { _id, firstName, lastName, email, role, fullName },
			});
		} else {
			return res.status(400).json({
				message: 'Invalid password',
			});
		}
	}
};

/**
 *
 * ! User Log out
 * * Post req
 */

exports.signout = async (req, res) => {
	res.clearCookie('token');
	res.status(200).json({
		message: 'Signed out successfully!',
	});
};
