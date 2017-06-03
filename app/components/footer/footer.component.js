import React from 'react';
import NavService from '../../services/nav.service';
import {GoogleMap, GoogleMarker} from '../google-map';
import './footer.component.less';

const Nav = new NavService();

export default class Footer extends React.Component {
	constructor(props) {
		super(props);
		this.sitemapArr = Nav.main;
		this.googleMapOptions = {
			center: {lat: 39.210696, lng: -84.364161},
			scrollwheel: false,
			zoom: 13,
		};
		this.googleMarkerOptions = {
			position: {lat: 39.220696, lng: -84.364161},
		};
	}
	render() {
		return (
			<footer className='bg-gray'>
				<div className='con'>
					<div className='row google-map'>
						<GoogleMap className='google-map' options={this.googleMapOptions}>
							<GoogleMarker/>
						</GoogleMap>
					</div>
					<div className='row sitemap'>
						{this.sitemapArr.map((x, idx)=>{
							return (
								<div key={idx} className='col-1'>
									<h6><strong>{x.parentName}</strong></h6>
									{x.children.map((y, idx2)=>{
										return (
											<a key={idx2} href={y.url}>{y.name}</a>
										);
									})}
								</div>
							);
						})}
					</div>
				</div>
			</footer>
		);
	}
}
