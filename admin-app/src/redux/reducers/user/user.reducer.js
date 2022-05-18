import { AddUserType } from '../../actiontypes';
const { ADD_USER_REQUEST, ADD_USER_FAILURE, ADD_USER_SUCCESS } = AddUserType;

const InitialState = {
	user: {
		firstName: '',
		lastName: '',
		username: '',
		email: '',
		picture: '',
		role: '',
	},
	isUserAdded: false,
	isUserAdding: false,
	error: '',
	message: '',
};

export const UserReducer = (state = InitialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case ADD_USER_REQUEST:
			state = {
				...state,
				isUserAdding: true,
			};
			break;
		case ADD_USER_SUCCESS:
			state = {
				...state,
				user: payload.user,
				isUserAdded: true,
				isUserAdding: false,
				message: payload.message,
			};
			break;
		case ADD_USER_FAILURE:
			state = {
				...state,
				isUserAdded: false,
				isUserAdding: false,
				error: payload.error,
			};
			break;
	}

	return state;
};
