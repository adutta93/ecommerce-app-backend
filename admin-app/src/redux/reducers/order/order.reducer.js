import { AuthTypes } from '../../actiontypes';

const InitialState = {
	isAauthenticated: false,
	isAuthenticating: false,
	loading: false,
	error: '',
	message: '',
};

export const OrderReducer = (state = InitialState, action) => {
	const { type, payload } = action;

	return state;
};
