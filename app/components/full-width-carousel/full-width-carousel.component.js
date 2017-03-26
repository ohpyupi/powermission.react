import React from 'react';
import $ from 'jquery';
import 'slippry/dist/slippry.css';
import 'slippry/dist/slippry.min.js';
import './full-width-carousel.component.less';

export default class FullWidthCarousel extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this._startCarousel();
	}
	render() {
		
		return (
			<section className='wrap-full-width-slideshow'>
				<ul>
					{this.props.imgArr.map((img, idx)=>{
						return <li key={idx}>
							<img src={img}/>
						</li>
					})}
				</ul>
			</section>
		);
	}
	_startCarousel() {
		let ele = document.querySelector('.wrap-full-width-slideshow');
		$(ele).slippry({
			slippryWrapper: '<div class="sy-box pictures-slider"/>',
			adaptiveHeight: false,
			captions: false,
			pager: false,
			controls: false,
			autoHover: false,
			transition: 'kenburns',
			kenZoom: 140,
			speed: 2000,
		});
	}
}
