import React, { useEffect, useState } from 'react';
import Dashboard from '../';
import ProductModal from '../../../Components/ProductModal';
import { Button, Heading, Flex, Spacer, List, ListItem, ListIcon, useDisclosure } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { BiCategoryAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

import { AddProductAction } from '../../../redux/actions/product/product.action';

const Products = () => {
	const [productData, SetProductData] = useState({
		productName: '',
		productQuantity: '',
		productDescription: '',
		productCategoryId: '',
		productPrice: '',
		productPictures: [],
	});
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const productstate = useSelector((state) => state.product);
	const categorystate = useSelector((state) => state.category);
	// console.log('From main product -- category', categorystate);
	// console.log('From main product -- product', productstate);

	const onChangeHandler = (e) => {
		e.target.name !== 'productPictures'
			? SetProductData({ ...productData, [e.target.name]: e.target.value })
			: SetProductData({ ...productData, [e.target.name]: e.target.files[0] });
	};
	// const onHandleCategoryImage = (event) => {
	// 	SetCategoryData({ categoryImage: event.target.files[0] });
	// };
	const onHandleSubmit = (event) => {
		event.preventDefault();

		const UpdatedProductData = new FormData();
		UpdatedProductData.append('name', productData.productName);
		UpdatedProductData.append('quantity', productData.productQuantity);
		UpdatedProductData.append('description', productData.productDescription);
		UpdatedProductData.append('category', productData.productCategoryId);
		UpdatedProductData.append('price', productData.productPrice);
		// for (let pic of productData?.productPictures) {
		// 	UpdatedProductData.append('productPictures', pic);
		// }
		console.log(UpdatedProductData);
		dispatch(AddProductAction(UpdatedProductData));
		SetProductData(productData);
		onClose();
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

	useEffect(() => {
		// dispatch(CategoryAction());
	}, []);
	return (
		<Dashboard>
			<Flex>
				{' '}
				<Heading as='h4' size='md' mt={1}>
					Products
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
					Add Product
				</Button>
				<ProductModal
					isOpen={isOpen}
					onOpen={onOpen}
					onClose={onClose}
					productData={productData}
					ProductOnchangeHandler={onChangeHandler}
					ProductOnHandleSubmit={onHandleSubmit}
					AddCategoryList={AddCategoryList}
				/>
			</Flex>
			{/* <List>{RenderCategories(categorystate.categories)}</List> */}
		</Dashboard>
	);
};

export default Products;
