import React from 'react';
import './style.less';
import Siema from 'siema';
import uuid from 'uuid/v4';

export default class FullWidthCarousel extends React.Component {
	constructor(props) {
		super(props);
		this.id = uuid();
		this.timer;
	}
	componentDidMount() {
		this.initCarousel();
	}
	componentWillUnmount() {
		clearInterval(this.timer);
	}
	render() {
		
		return (
			<section id={`${this.id}`} className='wrap-full-width-slideshow'>
				{this.props.imgArr.map((img, idx)=>{
					let divStyle = {
						backgroundImage: `url(${img})`
					};
					return (
						<div key={idx} style={divStyle}>
						</div>
					);
				})}
			</section>
		);
	}
	initCarousel() {
		this.carousel = new Siema({
			selector: '.wrap-full-width-slideshow',
			duration: 1000,
			easing: 'ease-out',
			startIndex: 0,
			loop: true,
			onInit: ()=>{
				this.fireAfterCarouselRendered();
			},
		})
	}
	fireAfterCarouselRendered() {
		this.timer = setInterval(()=>{
			this.carousel.next();
		}, 10000);
	}
}
