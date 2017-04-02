import React from 'react';
import MainNav from '../components/main-nav/main-nav.component';
import Footer from '../components/footer/footer.component';
import ErrorService from '../services/error.service';
import EyeCatch from '../components/eye-catch/eye-catch.component';


export default class Media extends React.Component {
	constructor(props) {
		super(props);
		this.$error = new ErrorService(this.props.transition.router.stateService);
		this.$stateParams = this.props.resolves.$stateParams;
	}
	render() {
		let authType = this.$stateParams.mediaType;
		return (
			<section id='media'>
				<MainNav _handleLogout={()=>{this._handleLogout()}}/>
				<EyeCatch page='media'/>
				<section className='container'>
					
					<h1>asd</h1>
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
