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
};

export const UserReducer = (state = InitialState, action) => {
	console.log('Action', action);
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
			};
			break;
		case ADD_USER_FAILURE:
			state = {
				isUserAdded: false,
				isUserAdding: false,
			};
			break;
	}

	return state;
};
