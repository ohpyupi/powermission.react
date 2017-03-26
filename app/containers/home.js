import React from 'react';

import MainNav from '../components/main-nav/main-nav.component';
import FullWidthCarousel from '../components/full-width-carousel/full-width-carousel.component';
import CardWrap from '../components/cards/card-wrap.component';
import Card from '../components/cards/card.component';
import Footer from '../components/footer/footer.component';

import ErrorService from '../services/error.service';

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.$error = new ErrorService(this.props.transition.router.stateService);
		this.carouselImgArr = [
			require('../lib/img/background-sample-1.jpg'),
			require('../lib/img/background-sample-2.jpg'),
			require('../lib/img/background-sample-3.jpg'),
		];
	}
	componentWillMount() {
	}
	componentDidMount() {
	}
	render() {
		return (
			<section id='home'>
				<MainNav _handleLogout={()=>{this._handleLogout()}}/>
				<FullWidthCarousel imgArr={this.carouselImgArr}/>
				<CardWrap>
					<Card/>
					<Card/>
					<Card/>
					<Card/>
				</CardWrap>
				<Footer/>
			</section>
		);
	}
	_handleLogout() {
		let vm = this;
		vm.$error.flash('Successfully logged out.');
	}
}
