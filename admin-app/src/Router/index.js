import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

//component
import Login from '../Pages/Login';
import Signup from '../Pages/Signup';
import Home from '../Pages/Home';
import Four0Four from '../Pages/Four0Four';
import Header from '../Components/Header';

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='/signup' element={<Signup />} />
				<Route path='/home' element={<Home />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
