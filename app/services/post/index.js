const API_URL = 'http://localhost:3000';
import axios from 'axios';
import Auth from '../auth.service';

let $auth = new Auth();
axios.defaults.baseURL = API_URL;
axios.defaults.headers.common['Authorization'] = `Bearer ${$auth.getToken()}`;

export default class Service {
	constructor() {
	
	}
	CRUD(payload={method: "post", post: {}}, query) {
		let url;
		if (query) {
			url = `/api/posts/${query}`;
		} else {
			url = `/api/posts`;
		}
		console.log(url);
		return axios({
			method: payload.method,
			url,
			data: payload.post,
		});
	}
}
