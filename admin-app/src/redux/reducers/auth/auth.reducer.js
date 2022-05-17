import { AuthTypes } from '../../actiontypes';
const { LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS } = AuthTypes;

const InitialState = {
	token: null,
	user: {
		firstName: '',
		lastName: '',
		username: '',
		email: '',
		picture: '',
		username: '',
		role: '',
	},
	isAauthenticated: false,
	isAuthenticating: false,
};

export const AuthReducer = (state = InitialState, action) => {
	console.log('Action', action);
	const { type, payload } = action;
	switch (type) {
		case LOGIN_REQUEST:
			state = {
				...state,
				isAauthenticated: true,
			};
			break;
		case LOGIN_SUCCESS:
			state = {
				...state,
				user: payload.user,
				token: payload.token,
				isAauthenticated: true,
			};
			break;
		case LOGIN_FAILURE:
			state = {
				isAauthenticated: false,
				isAuthenticating: false,
			};
	}

	return state;
};
