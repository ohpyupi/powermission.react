import React from 'react';

export default class Component extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className='btn-con' onClick={this.props.onClick}>
				<a  className={`btn ${this.props.className}`} href={this.props.href}>
					<i aria-hidden="true" className={`fa ${this.props.faClassName}`}></i>
					&nbsp; {this.props.text}
				</a>
			</div>
		);
	}
}
