import React, { useEffect, useState } from 'react';
import Dashboard from '../';
import { Button, Heading, Flex, Spacer, List, ListItem, ListIcon, useDisclosure } from '@chakra-ui/react';
import { CategoryAction, AddCategoryAction } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { BiCategoryAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../Components/Modal';

const CategoryPage = () => {
	const [categoryData, SetCategoryData] = useState({
		categoryName: '',
		parentCategoryId: '',
		categoryImage: '',
	});
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const categorystate = useSelector((state) => state.category);

	const onChangeHandler = (e) => {
		// SetCategoryData((prevState) => ({
		// 	...prevState,
		// 	[e.target.name]: e.target.value,
		// }));

		e.target.name !== 'categoryImage'
			? SetCategoryData({ ...categoryData, [e.target.name]: e.target.value })
			: SetCategoryData({ ...categoryData, [e.target.name]: e.target.files[0] });
	};
	// const onHandleCategoryImage = (event) => {
	// 	SetCategoryData({ categoryImage: event.target.files[0] });
	// };
	const onHandleSubmit = (event) => {
		event.preventDefault();

		const UpdatedCategoryData = new FormData();
		UpdatedCategoryData.append('name', categoryData.categoryName);
		UpdatedCategoryData.append('parentId', categoryData.parentCategoryId);
		UpdatedCategoryData.append('categoryImage', categoryData.categoryImage);
		console.log(UpdatedCategoryData);
		dispatch(AddCategoryAction(UpdatedCategoryData));
		onClose();
	};

	useEffect(() => {
		dispatch(CategoryAction());
	}, []);

	const RenderCategories = (categories) => {
		const AllCategories = [];
		for (let category in categories) {
			let item = categories[category];
			AllCategories.push(
				<ListItem ml={3}>
					<ListIcon mt={2} key={item._id} as={BiCategoryAlt} color='cyan.400' />
					{item.name}
					{item?.children?.length > 0 ? (
						<ListItem ml={8} mt={1} key={item?.children?._id}>
							{RenderCategories(item.children)}
						</ListItem>
					) : null}
				</ListItem>
			);
		}
		return AllCategories;
	};

	const AddCategoryList = (categories, options = []) => {
		for (let category in categories) {
			let item = categories[category];
			options.push({ value: item._id, name: item.name });
			if (item?.children?.length > 0) {
				AddCategoryList(item.children, options);
			}
		}
		return options;
	};
	return (
		<Dashboard>
			<Flex>
				{' '}
				<Heading as='h4' size='md' mt={1}>
					Categories
				</Heading>
				<Spacer />
				<Button
					onClick={onOpen}
					bg='cyan.400'
					color='white'
					_hover={{
						bg: 'cyan.300',
						color: 'white',
					}}
				>
					Add Category
				</Button>
				<Modal
					isOpen={isOpen}
					onOpen={onOpen}
					onClose={onClose}
					categoryData={categoryData}
					placeholder='Enter the category name'
					label='Category Name'
					header='Add a category'
					choose='Choose parent category'
					CategoryOnchangeHandler={onChangeHandler}
					CategoryOnHandleSubmit={onHandleSubmit}
					AddCategoryList={AddCategoryList}
				/>
			</Flex>
			<List>{RenderCategories(categorystate.categories)}</List>
		</Dashboard>
	);
};

export default CategoryPage;
