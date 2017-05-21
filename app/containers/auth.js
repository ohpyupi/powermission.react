import React from 'react';
import {UIView} from 'ui-router-react';
import ErrorService from '../services/error.service';
import AuthService from '../services/auth.service';
import Signup from '../components/auth/signup.component';
import Login from '../components/auth/login.component';
import Footer from '../components/footer/footer.component';

import hfunc from '../lib/hfunc';

export default class Auth extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {
				username: '',
				password: '',
				confirm: '',
			},
			error: {
				username: '',
				password: '',
				confirm: '',
			},
			valid: false,
		};
		this._error = new ErrorService(this.props.transition.router.stateService);
		this._auth = new AuthService();
		this._$stateParams = this.props.resolves.$stateParams;
	}
	render() {
		let vm = this,
		authType = vm._$stateParams.authType,
		authTemplate,
		authTitle;
		if (authType === "signup") {
			authTitle = "Create a New Account"
			authTemplate = (
				<Signup 
					user={vm.state.user}
					error={vm.state.error} 
					valid={vm.state.valid}
					_validForm={()=>{vm._validForm()}}
					_handleInputError={(e, target)=>{vm._handleInputError(e, target)}} 
					_handleInputChange={(e, target)=>{vm._handleInputChange(e, target)}}
				/>
			);
		} else if (authType === "login") {
			authTitle = "Sign in to Powermission"
			authTemplate = (
				<Login
					user={vm.state.user}
					error={vm.state.error}
					valid={vm.state.valid}
					_validForm={()=>{vm._validForm()}}
					_handleInputError={(e, target)=>{vm._handleInputError(e, target)}}
					_handleInputChange={(e, target)=>{vm._handleInputChange(e, target)}}
				/>
			);
		}
		return (
			<div>
			<section className='wrap-auth bg-gray'>
				<div className='container'>
					<div className='row'>
						<div className='con-auth col-1'>
							<div className='upperpart'>
								<div className='subject text-center'>
									<a href='/'>
										<img src={require('../lib/img/angularjs.png')}/>
										<h3>{authTitle}</h3>
									</a>
								</div>
								<form name='authForm' ref='authForm' id='authForm' onSubmit={(e)=>vm._handleSubmit(e)} noValidate>
									{authTemplate}
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Footer/>
			</div>
		);
	}
	_validForm() {
		let vm = this;
		let form = vm.refs.authForm;
		let authType = vm._$stateParams.authType;
		let inputArr = form.querySelectorAll('input');
		let formValid = true;
		inputArr.forEach((val, idx)=>{
			if (val.checkValidity() === false) formValid = false;
		});
		let valid;
		if (authType === "signup") {
			valid = formValid && hfunc.isEmail(vm.state.user.username) && hfunc.isPassword(vm.state.user.password) && hfunc.isPassword(vm.state.user.password, vm.state.user.confirm);
		} else if (authType === "login") {
			valid = formValid && hfunc.isEmail(vm.state.user.username) && hfunc.isPassword(vm.state.user.password);
		}
		let _tmp = Object.assign({}, vm.state);
		_tmp.valid = valid;
		vm.setState(_tmp);
	}
	_handleInputChange(e, target) {
		e.preventDefault();
		let vm = this;
		let name = e.target.name;
		let value = e.target.value;
		let _tmp = Object.assign({}, vm.state);
		_tmp[target][name] = value;
		vm.setState(_tmp);
	}
	_handleInputError(e, target) {
		e.preventDefault();
		let vm = this;
		let name = e.target.name;
		let value = e.target.value;
		let _tmp = Object.assign({}, vm.state);
		switch(name) {
			case 'username':
				if (hfunc.isEmail(value)) {
					_tmp.error[name] = '';
				} else {
					_tmp.error[name] = 'Username must be email.';
				}
				return vm.setState(_tmp);
			case 'password':
				if (hfunc.isPassword(value)) {
					_tmp.error[name] = '';
				} else {
					_tmp.error[name] = 'Password should be equal and longer than 8 letters.';
				}
				return vm.setState(_tmp);
			case 'confirm':
				if (hfunc.isPassword(vm.state.user.password, value)) {
					_tmp.error[name] = '';
				} else {
					_tmp.error[name] = 'Passwords must match.';
				}
				return vm.setState(_tmp);
			default:
				return vm.setState(_tmp);
		}
	}
	_handleSubmit(e) {
		e.preventDefault();
		let vm = this;
		let authType = vm._$stateParams.authType;
		if (authType === "signup") {
			vm._auth.signup(vm.state.user).then(res=>{
				vm._error.flash(res.data.message, "home");
			}).catch(err=>{
				vm._error.flash(err.response.data.message);
			});
		} else if (authType === "login") {
			vm._auth.login(vm.state.user).then(res=>{
				return vm._error.flash(res.data.message, "home");
			}).catch(err=>{
				return vm._error.flash(err.response.data.message);
			});
		} else {
			return vm._error.flash("Error: Unauthorized Attempt!", "home");
		}
	}
}
