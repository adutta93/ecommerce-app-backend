import { AuthTypes } from '../../actiontypes';
import AxiosInstance from '../../../utils/axios';
const { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, LOGOUT_REQUEST, LOGOUT_FAILURE } = AuthTypes;

export const LoginAction = (user) => {
	console.log('User from action', user);

	return async (dispatch) => {
		dispatch({ type: LOGIN_REQUEST });
		const response = await AxiosInstance.post(`/admin/signin`, {
			...user,
		});

		if (response?.status === 200) {
			const { token, user } = response?.data;
			localStorage.setItem('token', token);
			localStorage.setItem('user', JSON.stringify(user));
			dispatch({
				type: LOGIN_SUCCESS,
				payload: { token, user },
			});
		} else {
			if (response.status === 400 || response.status === 404) {
				dispatch({
					type: LOGIN_FAILURE,
					payload: { error: response.data.error },
				});
			}
		}
	};
};

export const isUserLoggedIn = () => {
	return async (dispatch) => {
		const token = localStorage.getItem('token');
		if (token) {
			const user = JSON.parse(localStorage.getItem('user'));
			dispatch({
				type: LOGIN_SUCCESS,
				payload: { token, user },
			});
		}
		dispatch({
			payload: {
				type: LOGIN_FAILURE,
				message: 'User is not logged in',
			},
		});
	};
};

export const signout = () => {
	return async (dispatch) => {
		localStorage.clear();
		dispatch({
			type: LOGOUT_REQUEST,
		});
	};
};
