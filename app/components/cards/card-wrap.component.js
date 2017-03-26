import React from 'react';
import './cards.component.less';

export default class CardWrap extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<section className='wrap-cards'>
				<div className='row around'>
					{this.props.children}
				</div>
			</section>
		);
	}
}
