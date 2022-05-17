import { Button, FormControl, FormLabel, Input, useToast, VStack, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import AuthLayout from '../../Layout/AuthLayout';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
	const login = true;
	const navigate = useNavigate();
	const handleSubmit = () => {
		alert('Hello world');
		navigate('/home', { replace: true });
	};
	return (
		<AuthLayout>
			<Text fontSize='large' textAlign='center' color='gray.600' fontWeight='bold' mb='2'>
				Hello Admin 👋 <br />
			</Text>
			<Text fontSize='large' textAlign='center' color='gray.500' mb='8'>
				Welcome to Admin Dashboard
			</Text>
			<form onSubmit={handleSubmit}>
				<VStack spacing='5' justify='space-between'>
					<FormControl isRequired>
						<FormLabel htmlFor='admin-username'>FirstName</FormLabel>
						<Input size='lg' id='admin-username' placeholder='Firstname' disabled value='admin' />
					</FormControl>
					<FormControl isRequired>
						<FormLabel htmlFor='admin-username'>Lastname</FormLabel>
						<Input size='lg' id='admin-username' placeholder='Lastname' disabled value='admin' />
					</FormControl>
					<FormControl isRequired>
						<FormLabel htmlFor='admin-username'>Email Id</FormLabel>
						<Input size='lg' id='admin-username' type='email' placeholder='Email' disabled value='admin' />
					</FormControl>
					<FormControl isRequired>
						<FormLabel htmlFor='admin-secret'>Password</FormLabel>
						<Input
							size='lg'
							id='admin-secret'
							placeholder='Admin secret'
							type='password'
							minLength={!login ? 6 : 1}
							disabled
							value='admin'
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
						Sign up
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
