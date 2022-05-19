import { AuthTypes } from '../../actiontypes';
const { LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT_REQUEST, LOGOUT_FAILURE, LOGOUT_SUCCESS } = AuthTypes;

const InitialState = {
	token: null,
	user: {
		firstName: '',
		lastName: '',
		username: '',
		email: '',
		picture: '',
		role: '',
	},
	isAauthenticated: false,
	isAuthenticating: false,
	loading: false,
	error: '',
	message: '',
};

export const AuthReducer = (state = InitialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case LOGIN_REQUEST:
			state = {
				...state,
				isAuthenticating: true,
			};
			break;
		case LOGIN_SUCCESS:
			state = {
				...state,
				user: payload.user,
				token: payload.token,
				isAauthenticated: true,
				isAuthenticating: false,
			};
			break;
		case LOGIN_FAILURE:
			state = {
				isAauthenticated: false,
				isAuthenticating: false,
			};
			break;
		case LOGOUT_REQUEST:
			state = {
				...state,
				loading: true,
			};
			break;
		case LOGOUT_SUCCESS:
			state = {
				...InitialState,
				loading: false,
			};
			break;
		case LOGOUT_FAILURE:
			state = {
				...state,
				error: payload.error,
				loading: false,
			};
			break;
	}

	return state;
};
