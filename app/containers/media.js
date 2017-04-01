import React from 'react';
import MainNav from '../components/main-nav/main-nav.component';
import ErrorService from '../services/error.service';


export default class Media extends React.Component {
	constructor(props) {
		super(props);
		this.$error = new ErrorService(this.props.transition.router.stateService);
	}
	render() {
		return (
			<section id='media'>
				<MainNav _handleLogout={()=>{this._handleLogout()}}/>
			</section>
		);
	}
	_handleLogout() {
		let vm = this;
		vm.$error.flash('Successfully logged out.');
	}
}
