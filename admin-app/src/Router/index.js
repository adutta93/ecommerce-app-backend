import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
//component
import Login from '../Pages/Login';
import AddUser from '../Pages/AddUser';
import Home from '../Pages/Dashboard';
import Four0Four from '../Pages/Four0Four';
import Users from '../Pages/Dashboard/Users';

// import setAuthToken from '../utils/SetAuthToken';
// import jwt_decode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from '../redux/actions';
//mock user

const Router = () => {
	const user = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	useEffect(() => {
		if (!user.isAauthenticated) {
			dispatch(isUserLoggedIn());
		}
	}, []);
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Login />} />
				{user?.token ? (
					user?.user?.role === 'super-admin' ? (
						[
							<Route path='/home' element={<Home />} />,
							<Route path='/add-user' element={<AddUser />} />,
							<Route path='/users' element={<Users />} />,
							<Route path='*' element={<Four0Four />} key='**' />,
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