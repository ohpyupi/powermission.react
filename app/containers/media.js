import React from 'react';
import MainNav from '../components/main-nav/main-nav.component';
import Footer from '../components/footer/footer.component';
import ErrorService from '../services/error.service';
import EyeCatch from '../components/eye-catch/eye-catch.component';
import PageBreadscrumb from '../components/page-breadscrumb/page-breadscrumb.component';
import MasonryWrap from '../components/masonry/masonry-wrap.component';
import Masonry from '../components/masonry/masonry.component';
import Modal from '../components/modal/modal.component';

import YoutubeService from '../services/google-youtube.service';

export default class Media extends React.Component {
	constructor(props) {
		super(props);
		this.$error = new ErrorService(this.props.transition.router.stateService);
		this.$stateParams = this.props.resolves.$stateParams;
		this.$youtube = new YoutubeService();
		this.state = {
			list: [],
		};
		this.mediaType;
	}
	componentDidMount() {
		this.mediaType = this.$stateParams.mediaType;
		let playlistIdObj = {
			"sunday-services": "PL9gDOW4-QXIKjMWdIDIXk9PFc9RKb3-Xi",
		};
		this.$youtube.getList(playlistIdObj[this.mediaType]).then((list)=>{
			let _tmp = Object.assign({}, this.state);
			_tmp.list = list;
			this.setState(_tmp);
		});
	}
	render() {
		let masonryWrap;
		if (this.state.list.length > 0) {
			masonryWrap = (
				<MasonryWrap>
					<div className='masonry-grid-sizer'></div>
					{
						this.state.list.map((x, idx)=>
							<Masonry key={idx} content={x}/>
						)
					}
				</MasonryWrap>
			);
		} else {
			masonryWrap = (
				<div>Loading...</div>
			);
		}
		return (
			<section id='media'>
				<MainNav _handleLogout={()=>{this._handleLogout()}}/>
				<EyeCatch page='media'/>
				<section className='container page-content'>
					<PageBreadscrumb page='media'/>
					{masonryWrap}
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
