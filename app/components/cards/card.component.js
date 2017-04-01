import React from 'react';

export default class Card extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		let vm = this;
	}
	render() {
		let content;
		if (this.props.img) {
			let _style = {
				height: '100%',
				backgroundSize: 'auto 100%',
				backgroundPosition: 'center',
				backgroundImage: `url(${this.props.img})`,
			};
			content = (
				<div className='card-content' style={_style}>
				</div>
			);
		}
		return (
			<div className='card'>
				{content}
			</div>
		);
	}
}
