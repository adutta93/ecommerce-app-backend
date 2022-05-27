import React from 'react';
import {
	Modal,
	Flex,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Input,
	Button,
	FormLabel,
	FormControl,
	useDisclosure,
	Select,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import FileUpload from '../Fileupload';

const ProductModalPopup = ({
	isOpen,
	onOpen,
	onClose,
	value,
	ProductOnchangeHandler,
	ProductOnHandleSubmit,
	AddCategoryList,
	productData,
}) => {
	const initialRef = React.useRef();
	const finalRef = React.useRef();
	const categorystate = useSelector((state) => state.category);
	// console.log('From product -- modal', categorystate);

	return (
		<>
			<Modal
				initialFocusRef={initialRef}
				finalFocusRef={finalRef}
				isOpen={isOpen}
				onClose={onClose}
				encType='multipart/form-data'
			>
				<ModalOverlay />
				<ModalContent encType='multipart/form-data'>
					<ModalHeader>Add a product</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<FormLabel>Product name</FormLabel>
							<Input
								// ref={initialRef}
								name='productName'
								placeholder='Name'
								onChange={ProductOnchangeHandler}
								value={productData?.productName}
							/>
						</FormControl>

						<FormControl mt={3}>
							<FormLabel>Description</FormLabel>
							<Input
								// ref={initialRef}
								name='productDescription'
								placeholder='Product description'
								onChange={ProductOnchangeHandler}
								value={productData?.productDescription}
							/>
						</FormControl>

						<Flex mt={3}>
							<FormControl>
								<FormLabel>Quantity</FormLabel>
								<Input
									// ref={initialRef}
									name='productQuantity'
									placeholder='Quantity'
									onChange={ProductOnchangeHandler}
									value={productData?.productQuantity}
									maxW='90%'
								/>
							</FormControl>

							<FormControl>
								<FormLabel>Price</FormLabel>
								<Input
									// ref={initialRef}
									name='productPrice'
									placeholder='Price'
									onChange={ProductOnchangeHandler}
									value={productData?.productPrice}
									maxW='90%'
								/>
							</FormControl>
						</Flex>

						<FormControl mt={4}>
							<FormLabel>Choose category</FormLabel>
							<Select placeholder='Select option' onChange={ProductOnchangeHandler} name='productCategoryId'>
								{AddCategoryList(categorystate.categories).map((option) => (
									<option key={option.value} value={option.value}>
										{option.name}
									</option>
								))}
							</Select>
						</FormControl>
						<FormControl mt={4} encType='multipart/form-data'>
							<FormLabel>Upload Image(s)</FormLabel>
							{/* value={categoryData?.categoryImage} */}
							<input type='file' value={''} onChange={ProductOnchangeHandler} name='productPictures' />
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme='blue' mr={3} onClick={ProductOnHandleSubmit}>
							Save
						</Button>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default ProductModalPopup;
