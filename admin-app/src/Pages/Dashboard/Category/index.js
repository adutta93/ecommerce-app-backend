import React, { useEffect } from 'react';
import Dashboard from '../';
import { Button, Heading, Flex, Spacer, List, ListItem, ListIcon } from '@chakra-ui/react';
import { CategoryAction } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { BiCategoryAlt } from 'react-icons/bi';

const CategoryPage = () => {
	const dispatch = useDispatch();
	const categorystate = useSelector((state) => state.category);

	useEffect(() => {
		dispatch(CategoryAction());
	}, []);

	const RenderCategories = (categories) => {
		const AllCategories = [];
		for (let category in categories) {
			let item = categories[category];
			AllCategories.push(
				<ListItem>
					<ListIcon as={BiCategoryAlt} color='green.500' />
					{item.name}
				</ListItem>
			);
		}
		return AllCategories;
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
					bg='cyan.400'
					color='white'
					_hover={{
						bg: 'cyan.300',
						color: 'white',
					}}
				>
					Add Category
				</Button>
			</Flex>
			<List>{RenderCategories(categorystate.categories)}</List>
		</Dashboard>
	);
};

export default CategoryPage;
