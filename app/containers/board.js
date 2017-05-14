import React from 'react';
import MainNav from '../components/main-nav/main-nav.component';
import Footer from '../components/footer/footer.component';
import ErrorService from '../services/error.service';
import EyeCatch from '../components/eye-catch/eye-catch.component';
import PageBreadscrumb from '../components/page-breadscrumb/page-breadscrumb.component';

export default class Board extends React.Component {
	constructor(props) {
		super();
	}
	componentDidMount() {
	}
	render() {
		return (
			<section id='board'>
				<MainNav _handleLogout={()=>{this._handleLogout()}}/>
				<EyeCatch page='board'/>
				<section className='container page-content'>
					<PageBreadscrumb page='board'/>
				</section>
				<Footer/>
			</section>
		);
	}
	_handleLogout() {
		let vm = this;
		vm.$error.flash('Successfully logged out.');
	}
}
