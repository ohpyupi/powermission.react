import React from 'react';
import './modal.component.less';

export default class Modal extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			primaryColor: 'purple',
		};
	}
	componentWillMount() {
	}
	componentDidMount() {
		this._handleModalCloseEvent();
	}
	render() {
		return (
			<section id={this.props.id} ref={(ele)=>{this.ele = ele}} className='modal-wrap'>
				<div className='modal-con'>
					<div className={`modal-title bg-${this.state.primaryColor}`}>
						<h3>{this.props.title || 'Modal Title'}</h3>
					</div>
					<div className='modal-body'>
						{this.props.children}
					</div>
					<div className='modal-footer'>
						<button onClick={()=>{this._closeModal()}} className={`btn btn-${this.state.primaryColor} color-white`}>Close</button>
					</div>
				</div>
			</section>
		);
	}
	_closeModal() {
		let event = new Event('modal-close');
		this.ele.style.display = "none";
		document.dispatchEvent(event);
	}
	_handleModalCloseEvent() {
		this.ele.addEventListener('click', (e)=>{
			if (this.ele !== e.target) return;
			this._closeModal();
		}, false);
	}
}
