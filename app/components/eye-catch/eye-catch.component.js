import React from 'react';
import './eye-catch.component.less';

export default class EyeCatch extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<section className={`page-eye-catch ${this.props.page}`}>
				<div className='overlay'></div>
			</section>
		);
	}
}
