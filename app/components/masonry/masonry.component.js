import React from 'react';
import uuid from 'uuid/v4';
import Modal from '../modal/modal.component';
import YoutubeIframe from '../youtube/youtube-iframe.component';

export default class Masonry extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			item: {},
			modalId: uuid(),
		};
	}
	componentWillMount() {
		this.setState({
			item: this.props.content.snippet,
		});
	}
	render() {
		let item = this.state.item;
		let default_description = `
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
		`;
		let _style = {
			backgroundImage: `url(${item.thumbnails.high.url})`,
		};
		return (
			<div className='masonry-grid-item'>
				<div className='item-con'>
					<div className='item-thumbnail' style={_style}></div>
					<div className='item-description'>
						<h4 className='item-title'>
							{item.title}
						</h4>
						<p>
							{item.description || default_description}
						</p>
						<button type='button' onClick={()=>{this._openModal()}} className='btn btn-purple color-white'>Watch</button>
						<Modal id={this.state.modalId} title={item.title} youtube={this.youtube}>
							<YoutubeIframe ref={(ele)=>{this.youtube = ele}} videoId={item.resourceId.videoId}/>
						</Modal>
					</div>
				</div>
			</div>
		);
	}
	_openModal() {
		let modal = document.getElementById(this.state.modalId);
		modal.style.display = 'block';
	}
}
