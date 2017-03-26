import React from 'react';

export default class Card extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className='card'>
				<div className='card-title'>
					<h3>
						<i className='fa fa-external-link' aria-hidden='true'></i>
						&nbsp; 하하
						<small>&nbsp; - haha</small>
					</h3>
				</div>
				<div className='card-content'>
					<p>content</p>
				</div>
			</div>
		);
	}
}
