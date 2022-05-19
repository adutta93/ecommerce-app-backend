import axios from 'axios';
import { API_URL } from './UrlConfig';

const token = window.localStorage.getItem('token');
const AxiosInstace = axios.create({
	baseURL: API_URL,
	headers: {
		Authorization: token ? `Bearer ${token}` : '',
	},
});

export default AxiosInstace;
