import axios from 'axios';
import { API_URL } from './UrlConfig';

const AxiosInstace = axios.create({
	baseURL: API_URL,
	headers: {
		Authorization: '',
	},
});

export default AxiosInstace;
