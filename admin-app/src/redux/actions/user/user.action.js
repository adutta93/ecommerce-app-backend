import AxiosInstance from '../../../utils/axios';
import { AddUserType } from '../../actiontypes';
const { ADD_USER_REQUEST, ADD_USER_FAILURE, ADD_USER_SUCCESS } = AddUserType;

export const AddUserAction = (user) => {
	console.log('User from action', user);

	return async (dispatch) => {
		dispatch({ type: ADD_USER_REQUEST });
		const response = await AxiosInstance.post(`/admin/signup`, {
			...user,
		});

		if (response?.status === 200) {
			const { message } = response?.data;
			dispatch({
				type: ADD_USER_SUCCESS,
				payload: { message },
			});
		} else {
			if (response.status === 400 || response.status === 404) {
				dispatch({
					type: ADD_USER_FAILURE,
					payload: { error: response.data.error },
				});
			}
		}
	};
};
