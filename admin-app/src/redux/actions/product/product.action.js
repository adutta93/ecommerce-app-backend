import AxiosInstance from '../../../utils/axios';
import { ProductType } from '../../actiontypes/';
const {
	GET_PRODUCT_REQUEST,
	GET_PRODUCT_FAILURE,
	GET_PRODUCT_SUCCESS,
	ADD_NEW_PRODUCT_SUCCESS,
	ADD_NEW_PRODUCT_FAILURE,
	ADD_NEW_PRODUCT_REQUEST,
} = ProductType;

export const AddProductAction = (form) => {
	return async (dispatch) => {
		dispatch({ type: GET_PRODUCT_REQUEST });
		// const response = await AxiosInstance.post(`/admin/signin`, {
		// 	...user,
		// });

		// if (response?.status === 200) {
		// 	const { token, user } = response?.data;
		// 	localStorage.setItem('token', token);
		// 	localStorage.setItem('user', JSON.stringify(user));
		// 	dispatch({
		// 		type: GET_PRODUCT_SUCCESS,
		// 		payload: { token, user },
		// 	});
		// } else {
		// 	if (response.status === 400 || response.status === 404) {
		// 		dispatch({
		// 			type: GET_PRODUCT_FAILURE,
		// 			payload: { error: response.data.error },
		// 		});
		// 	}
		// }
		const response = await AxiosInstance.post(`/product/create`, form);
		console.log(response);
	};
};
