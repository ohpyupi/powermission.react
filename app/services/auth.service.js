const localStorageName = 'powermission-react';

import axios from 'axios';

export default class AuthService {
	constructor () {
		this._$window = window;
	}
	getToken() {
		return this._$window.localStorage[localStorageName];
	}
	getPayload() {
		let token = this.getToken();
		let payload = {};
		try {
			payload = JSON.parse(this._$window.atob(token.split('.')[1]));
		}	catch (err) {
			console.log(err);
		}
		return payload;
	}
	saveToken(token) {
		this._$window.localStorage[localStorageName] = token;
	}
	isLoggedIn() {
		let vm = this;
		let token = vm.getToken();
		if (token) {
			let payload = JSON.parse(vm._$window.atob(token.split('.')[1]));
			return payload.exp > Date.now() / 1000;
		} else {
			return false;
		};
	}
	signup(user) {
		let vm = this;
		return new Promise((resolve, reject)=>{
			axios.post('/api/auth/sign-up', user).then(res=>{
				vm.saveToken(res.data.token);
				resolve(res);
			}).catch(err=>{
				reject(err);
			});
		});
	}
	login(user) {
		let vm = this;
		return axios.post('/api/auth/sign-in', user).then(res=>{
			vm.saveToken(res.data.token);
			return res;
		}).catch(err=>{
			return err;
		});
	}
	logout () {
		return this._$window.localStorage.removeItem(localStorageName);
	}
}
