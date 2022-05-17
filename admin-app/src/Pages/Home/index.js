import React from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
	const navigate = useNavigate();
	const Gotologin = () => {
		navigate('/', { replace: true });
	};
	return (
		<div>
			<p onClick={Gotologin}>Back</p>
			<h1>Welcome to Admin Dashboard</h1>
			<p>
				It is a long established fact that a reader will be distracted by the readable content of a page when looking at
				its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as
				opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing
				packages and web page editors now use Lorem Ipsum as their default model text, and a sear
			</p>
		</div>
	);
};

export default Home;
