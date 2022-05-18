import React, { useEffect, useState } from 'react';
import { Button, FormControl, FormLabel, Input, useToast, VStack, HStack, Text } from '@chakra-ui/react';
import AuthLayout from '../../Layout/AuthLayout';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Components/Loader/Loader';

//Redux Imports
import { AddUserAction } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

export default function AddUser() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const toast = useToast();
	const newuser = useSelector((state) => state.newuser);
	const [addUser, SetAddUser] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		role: '',
		error: '',
	});

	const onChangeHandler = (e) => {
		SetAddUser((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onHandleSubmit = (event) => {
		event.preventDefault();
		let user = {
			firstName: addUser.firstName,
			lastName: addUser.lastName,
			email: addUser.email,
			password: addUser.password,
			// role: addUser.role,
		};
		console.log('User from Add user', user);
		dispatch(AddUserAction(user));
	};

	if (newuser?.isUserAdded) {
		toast({
			title: `🎉 ${newuser.message}`,
			status: 'success',
			duration: 3000,
			isClosable: true,
		});
		navigate('/home', { replace: true });
	}
	// if (!newuser?.isUserAdded) {
	// 	toast({
	// 		title: ` ${newuser.error}`,
	// 		status: 'error',
	// 		duration: 3000,
	// 		isClosable: true,
	// 	});
	// }
	if (newuser?.isUserAdding) {
		return <Loader />;
	}
	const login = false;
	return (
		<AuthLayout>
			<Text fontSize='large' textAlign='center' color='gray.600' fontWeight='bold' mb='2'>
				Hello Admin 👋 <br />
			</Text>
			<Text fontSize='large' textAlign='center' color='gray.500' mb='8'>
				Add your favorite people here
			</Text>

			<form onSubmit={onHandleSubmit}>
				<VStack spacing='5' justify='space-between'>
					<HStack>
						<FormControl isRequired>
							<FormLabel htmlFor='admin-username'>First name</FormLabel>
							<Input
								size='lg'
								id='admin-username'
								placeholder='Firstname'
								value={addUser.firstName}
								name='firstName'
								onChange={onChangeHandler}
							/>
						</FormControl>
						<FormControl isRequired>
							<FormLabel htmlFor='admin-username'>Lastname</FormLabel>
							<Input
								size='lg'
								id='admin-username'
								placeholder='Last name'
								value={addUser.lastName}
								name='lastName'
								onChange={onChangeHandler}
							/>
						</FormControl>
					</HStack>

					<FormControl isRequired>
						<FormLabel htmlFor='admin-username'>Email Id</FormLabel>
						<Input
							size='lg'
							id='admin-username'
							type='email'
							placeholder='Email'
							value={addUser.email}
							name='email'
							onChange={onChangeHandler}
						/>
					</FormControl>
					<FormControl isRequired>
						<FormLabel htmlFor='admin-secret'>Password</FormLabel>
						<Input
							size='lg'
							id='admin-secret'
							placeholder='Admin secret'
							type='password'
							minLength={!login ? 6 : 1}
							value={addUser.password}
							name='password'
							onChange={onChangeHandler}
						/>
					</FormControl>
					<Button
						// isLoading={signUpResult.fetching || loginResult.fetching}
						colorScheme='blue'
						size='lg'
						w='100%'
						d='block'
						type='submit'
					>
						Add User
					</Button>
					{login ? (
						<Text color='gray.600' fontSize='sm'>
							<b>Note:</b> Some note <code>Note</code> Some note{' '}
						</Text>
					) : (
						<Text color='gray.600' fontSize='sm'>
							<b>Note:</b> Configure the password to start using your dashboard.
						</Text>
					)}
				</VStack>
			</form>
		</AuthLayout>
	);
}
