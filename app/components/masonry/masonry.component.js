import React from 'react';

export default class Masonry extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			item: {},
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
		console.log(item);
		let _style = {
			backgroundImage: `url(${item.thumbnails.high.url})`,
		};
		console.log(_style);
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
						<button type='button' className='btn btn-purple color-white'>Watch</button>
					</div>
				</div>
			</div>
		);
	}
}
