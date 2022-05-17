import { Button, FormControl, FormLabel, Input, useToast, VStack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import AuthLayout from '../../Layout/AuthLayout';
import { useNavigate } from 'react-router-dom';
import { AxiosInstace } from '../../utils/axios';
import Loader from '../../Components/Loader/Loader';

//Redux Imports
import { LoginAction } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

export default function Login() {
	const [userLogin, SetUserLogin] = useState({
		email: '',
		password: '',
		error: '',
	});

	const onChangeHandler = (e) => {
		SetUserLogin((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};
	const login = true;
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const toast = useToast();
	const user = useSelector((state) => state.auth);

	const onHandleSubmit = (event) => {
		event.preventDefault();
		let user = {
			email: userLogin.email,
			password: userLogin.password,
		};
		dispatch(LoginAction(user));
	};
	if (user?.isAauthenticated) {
		toast({
			title: '🎉 Successfully logged in',
			status: 'success',
			duration: 3000,
			isClosable: true,
		});
		navigate('/home', { replace: true });
	}

	if (user?.isAuthenticating) {
		return <Loader />;
	}
	return (
		<AuthLayout>
			<Text fontSize='large' textAlign='center' color='gray.600' fontWeight='bold' mb='2'>
				Hello Admin 👋 <br />
			</Text>
			<Text fontSize='large' textAlign='center' color='gray.500' mb='8'>
				Welcome to Admin Dashboard
			</Text>
			<form onSubmit={onHandleSubmit}>
				<VStack spacing='5' justify='space-between'>
					<FormControl isRequired>
						<FormLabel htmlFor='admin-username'>Email</FormLabel>
						<Input
							size='lg'
							id='admin-email'
							placeholder='email'
							name='email'
							value={userLogin.email}
							onChange={onChangeHandler}
						/>
					</FormControl>
					<FormControl isRequired>
						<FormLabel htmlFor='admin-secret'>Password</FormLabel>
						<Input
							size='lg'
							id='admin-password'
							placeholder='Password'
							type='password'
							minLength={!login ? 6 : 1}
							name='password'
							value={userLogin.password}
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
						{login ? 'Login' : 'Sign up'}
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
