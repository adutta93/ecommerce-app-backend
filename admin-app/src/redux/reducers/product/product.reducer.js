import { AuthTypes } from '../../actiontypes';

const InitialState = {
	isAauthenticated: false,
	isAuthenticating: false,
	loading: false,
	error: '',
	message: '',
};

export const ProductReducer = (state = InitialState, action) => {
	const { type, payload } = action;

	return state;
};
