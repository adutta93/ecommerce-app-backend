import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

//component
import Login from '../Pages/Login';
import Signup from '../Pages/Signup';
import Home from '../Pages/Home';
import Four0Four from '../Pages/Four0Four';
import Header from '../Components/Header';

import setAuthToken from '../utils/SetAuthToken';
import jwt_decode from 'jwt-decode';
import { useSelector } from 'react-redux';

//mock user

const Router = () => {
	const user = useSelector((state) => state.auth);
	const ValidateToken = (token) => {
		if (token) {
			setAuthToken(token);
			let decoded = jwt_decode(token);
			console.log('Decoded value', decoded);
			if (decoded?._id === user?.user._id) {
				return true;
			}
			localStorage.removeItem('user');
			return false;
		}
	};
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Login />} />
				{ValidateToken(user?.token) ? (
					user?.user?.role === 'super-admin' ? (
						[
							<Route path='/home' element={<Home />} />,
							<Route path='/signup' element={<Signup />} />,
							// <Route path='*' element={<Warning />} key='*' />,
						]
					) : user?.user?.role === 'admin' ? (
						[[<Route path='/home' element={<Home />} />]]
					) : (
						[<Route path='/home' element={<Home />} />]
					)
				) : (
					<Route path='*' element={<Four0Four />} key='**' />
				)}
			</Routes>
		</BrowserRouter>
	);
};

export default Router;

// {
// 	ValidateToken(user?.token) ? (
// 		user?.user?.role === 'super-admin' ? (
// 			[
// 				<Route path='/signup' element={<Signup />} />,
// 				<Route path='/home' element={<Home />} />,
// 				<Route path='*' element={<Warning />} key='*' />,
// 			]
// 		) : user?.user?.role === 'admin' ? (
// 			[[<Route path='/home' element={<Home />} />, <Route path='*' element={<Warning />} key='*' />]]
// 		) : (
// 			[<Route path='/home' element={<Home />} />, <Route path='*' element={<Warning />} key='*' />]
// 		)
// 	) : (
// 		<Route path='*' element={<Four0Four />} key='**' />
// 	);
// }
