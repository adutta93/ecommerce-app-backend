import React, { useEffect, useState } from 'react';
import Dashboard from '../';
import { Button, Heading, Flex, Spacer, List, ListItem, ListIcon, useDisclosure } from '@chakra-ui/react';
import { CategoryAction } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { BiCategoryAlt } from 'react-icons/bi';

import Modal from '../../../Components/Modal';

const CategoryPage = () => {
	const [categoryData, SetCategoryData] = useState({
		categoryName: '',
		parentCategoryId: '',
		categoryImage: '',
	});
	const dispatch = useDispatch();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const categorystate = useSelector((state) => state.category);

	const onChangeHandler = (e) => {
		SetCategoryData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onHandleSubmit = (event) => {
		event.preventDefault();
		let NewCategory = {
			categoryName: categoryData.categoryName,
			parentCategoryId: categoryData.parentCategoryId,
			categoryImage: categoryData.categoryImage,
		};
		console.log(NewCategory);
		// dispatch(LoginAction(user));
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
						<ListItem ml={8} mt={1}>
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
					value={categoryData}
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
