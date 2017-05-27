import React from 'react';
import './cards.component.less';

export default class CardWrap extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		console.log(this.props);
		return (
			<section className={`wrap-cards ${this.props.className}`}>
				<div className='row around'>
					{this.props.children}
				</div>
			</section>
		);
	}
}
