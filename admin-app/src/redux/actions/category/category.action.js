import AxiosInstance from '../../../utils/axios';
import { CategoryType } from '../../actiontypes/';
const {
	GET_CATEGORIES_REQUEST,
	GET_CATEGORIES_FAILURE,
	GET_CATEGORIES_SUCCESS,
	ADD_NEW_CATEGORIES_REQUEST,
	ADD_NEW_CATEGORIES_FAILURE,
	ADD_NEW_CATEGORIES_SUCCESS,
} = CategoryType;

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

export const AddCategoryAction = (form) => {
	return async (dispatch) => {
		dispatch({ type: ADD_NEW_CATEGORIES_REQUEST });
		const response = await AxiosInstance.post(`/category/create`, form);

		console.log('Category', response);
		if (response?.status === 201) {
			const { category } = response?.data;

			dispatch({
				type: ADD_NEW_CATEGORIES_SUCCESS,
				payload: category,
			});
		} else {
			dispatch({
				type: ADD_NEW_CATEGORIES_FAILURE,
				payload: { error: response.data.error },
			});
		}
	};
};
