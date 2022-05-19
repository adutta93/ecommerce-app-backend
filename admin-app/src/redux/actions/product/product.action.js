import AxiosInstance from '../../../utils/axios';
import { AuthTypes } from '../../actiontypes/';
const { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, LOGOUT_REQUEST, LOGOUT_FAILURE } = AuthTypes;

export const ProductAction = (user) => {
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
