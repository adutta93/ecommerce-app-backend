import React from 'react';
import {
	Modal,
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
import { CategoryAction } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import FileUpload from '../Fileupload';

const ModalPopup = ({
	isOpen,
	onOpen,
	onClose,
	value,
	placeholder,
	label,
	header,
	choose,
	CategoryOnchangeHandler,
	CategoryOnHandleSubmit,
	AddCategoryList,
	categoryData,
}) => {
	const initialRef = React.useRef();
	const finalRef = React.useRef();
	const categorystate = useSelector((state) => state.category);

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
					<ModalHeader>{header}</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<FormLabel>{label}</FormLabel>
							<Input
								// ref={initialRef}
								name='categoryName'
								placeholder={placeholder}
								onChange={CategoryOnchangeHandler}
								value={categoryData?.categoryName}
							/>
						</FormControl>

						<FormControl mt={4}>
							<FormLabel>{choose}</FormLabel>
							<Select placeholder='Select option' onChange={CategoryOnchangeHandler} name='parentCategoryId'>
								{AddCategoryList(categorystate.categories).map((option) => (
									<option key={option.value} value={option.value}>
										{option.name}
									</option>
								))}
							</Select>
						</FormControl>
						<FormControl mt={4} encType='multipart/form-data'>
							<FormLabel>Upload Image</FormLabel>
							{/* value={categoryData?.categoryImage} */}
							<input type='file' value={''} onChange={CategoryOnchangeHandler} name='categoryImage' />
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme='blue' mr={3} onClick={CategoryOnHandleSubmit}>
							Save
						</Button>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default ModalPopup;
