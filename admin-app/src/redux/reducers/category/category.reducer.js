import { CategoryType } from '../../actiontypes';
const {
	GET_CATEGORIES_REQUEST,
	GET_CATEGORIES_FAILURE,
	GET_CATEGORIES_SUCCESS,
	ADD_NEW_CATEGORIES_REQUEST,
	ADD_NEW_CATEGORIES_FAILURE,
	ADD_NEW_CATEGORIES_SUCCESS,
} = CategoryType;

const InitialState = {
	categories: [],
	loading: false,
	error: '',
	message: '',
};

const BuildNewCategories = (parentId, categories, category) => {
	let myCategories = [];

	if (parentId == undefined) {
		return [
			...categories,
			{
				_id: category._id,
				name: category.name,
				slug: category.slug,
				type: category.type,
				children: [],
			},
		];
	}

	for (let cat of categories) {
		if (cat._id == parentId) {
			const newCategory = {
				_id: category._id,
				name: category.name,
				slug: category.slug,
				parentId: category.parentId,
				type: category.type,
				children: [],
			};
			myCategories.push({
				...cat,
				children: cat.children.length > 0 ? [...cat.children, newCategory] : [newCategory],
			});
		} else {
			myCategories.push({
				...cat,
				children: cat.children ? BuildNewCategories(parentId, cat.children, category) : [],
			});
		}
	}

	return myCategories;
};

export const CategoryReducer = (state = InitialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case GET_CATEGORIES_SUCCESS:
			state = {
				...state,
				categories: payload,
			};
			break;
		case ADD_NEW_CATEGORIES_REQUEST:
			state = {
				...state,
				loading: true,
			};
			break;
		case ADD_NEW_CATEGORIES_SUCCESS:
			const UpdatedCategories = BuildNewCategories(payload.category.parentId, state.categories, payload.category);
			state = {
				...state,
				categories: UpdatedCategories,
				loading: false,
			};
			break;
		case ADD_NEW_CATEGORIES_FAILURE:
			state = {
				...InitialState,
			};
			break;
	}

	return state;
};
