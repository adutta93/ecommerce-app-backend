import AxiosInstance from '../../../utils/axios';
import { CategoryType } from '../../actiontypes/';
const { GET_CATEGORIES_REQUEST, GET_CATEGORIES_FAILURE, GET_CATEGORIES_SUCCESS } = CategoryType;

export const CategoryAction = () => {
	return async (dispatch) => {
		dispatch({ type: GET_CATEGORIES_REQUEST });
		const response = await AxiosInstance.get(`/category/getcategory`);

		if (response?.status === 200) {
			const { categoryList } = response?.data;

			dispatch({
				type: GET_CATEGORIES_SUCCESS,
				payload: categoryList,
			});
		} else {
			dispatch({
				type: GET_CATEGORIES_FAILURE,
				payload: { error: response.data.error },
			});
		}
	};
};
