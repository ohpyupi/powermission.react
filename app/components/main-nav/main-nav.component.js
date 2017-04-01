import React from 'react';
import './main-nav.component.less';

import NavService from '../../services/nav.service';
import AuthService from '../../services/auth.service';
import ErrorService from '../../services/error.service';

let Nav = new NavService();

export default class MainNav extends React.Component {
	constructor(props) {
		super(props);
		this.nav = Nav.main;
		this.auth = new AuthService();
		this.state = {
			subnavChildren: this.nav[0].children,
		};
	}
	componentWillMount() {
		let vm = this;
	}
	componentDidMount() {
		let vm = this;
		vm._handleNavEvent();
	}
	render() {
		let vm = this;
		let _authControl;
		if (vm.auth.isLoggedIn()) {
			_authControl = (
				<a onClick={(e)=>{vm._handleLogout(e)}}>
					<i className='fa fa-sign-out' aria-hidden='true'></i>
				</a>
		);
		} else {
			_authControl = (
				<a href='/auth/login'>
					<i className='fa fa-sign-in' aria-hidden='true'></i>
				</a>
			);
		}
		return (
			<section className='wrap-nav'>
				<nav className='main-nav'>
					<a href='/' className=''>홈</a>
					<a href='' className='btn-main-nav'>소개</a>
					<a href='' className='btn-main-nav'>훈련</a>
					<a href='' className='btn-main-nav'>선교</a>
					<a href='' className='btn-main-nav'>영상</a>
					<a href='' className='btn-main-nav'>게시판</a>
					{_authControl}
				</nav>
				<div className='sub-nav'>
					{vm.state.subnavChildren.map(x=>{
						let _img = x.img || 'angularjs.png';
						return (
							<div key={x.name} className='col'>
								<a href={x.url}><img src={require(`../../lib/img/${_img}`)}/></a>
								<p>{x.name}</p>
							</div>
						);
					})}
				</div>
			</section>
		);
	}
	_handleLogout(e) {
		e.preventDefault();
		let vm = this;
		vm.auth.logout();
		vm.forceUpdate();
		vm.props._handleLogout();
	}
	_handleNavEvent() {
		let vm = this;
		let btns = document.querySelectorAll('.btn-main-nav');
		btns.forEach((btn, idx)=>{
			btn.addEventListener('mouseenter', ()=>{
				let _tmp = Object.assign({}, vm.state);
				_tmp.subnavChildren = vm.nav[idx].children;
				vm.setState(_tmp);
			});
		});
	}
}
