import React from 'react';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';

import './masonry.component.less';

export default class MasonryWrap extends React.Component {
	constructor(props) {
		super(props);
		this._timer;
	}
	componentDidMount() {
		let masonryGrid = document.querySelector('.masonry-grid');
		let masonry = new Masonry(masonryGrid, {
			itemSelector: '.masonry-grid-item',
			percentPosition: true,
		});
		masonry.reloadItems();
		masonry.layout();
		//this._timer = setInterval(()=>{
		//	masonry.reloadItems();
		//	masonry.layout();
		//}, 1000);
	}
	componentWillUnmount() {
		//clearInterval(this._timer);
	}
	render() {
		return (
			<div className='masonry-grid'>
				{this.props.children}
			</div>
		);
	}
}
