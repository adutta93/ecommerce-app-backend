const User = require('../models/user.model');

const FindUser = async (id, email) => {
	if (email) {
		return await User.findOne({ email: email });
	} else {
		return await User.findById(id);
	}
};

module.exports = { FindUser };
