import React from 'react';
import hfunc from '../../lib/hfunc.js';

export default class Signup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.timer;
	}
	componentWillMount() {
		let vm = this;
	}
	componentDidMount() {
		let vm = this;
		vm.timer = setInterval(()=>{
			vm.props._validForm();
		}, 500);
	}
	componentWillUnmount() {
		let vm = this;
		clearInterval(vm.timer);
	}
	render() {
		let vm = this;
		return (
			<div className='form-group'>
				<div className='form-group'>
					<label htmlFor='username'>
						Username (email)
					</label>
					<input className='form-control' type='text' value={vm.props.user.username} name='username' onChange={(e)=>{vm.props._handleInputChange(e, "user"); vm.props._handleInputError(e, "user")}} required/>
					<span className='error'>{vm.props.error.username}</span>
				</div>
				<div className='form-group'>
					<label htmlFor='password'>
						Password
					</label>
					<input className='form-control' type='password' value={vm.props.user.password} name='password' onChange={(e)=>{vm.props._handleInputChange(e, "user"); vm.props._handleInputError(e, "user")}} required/>
					<span className='error'>{vm.props.error.password}</span>
				</div>
				<div className='form-group'>
					<label htmlFor='confirm'>
						Confirm
					</label>
					<input className='form-control' type='password' value={vm.props.user.confirm} onChange={(e)=>{vm.props._handleInputChange(e, "user"); vm.props._handleInputError(e, "user")}} name='confirm' required/>
					<span className='error'>{vm.props.error.confirm}</span>
				</div>
				<div className='form-group'>
					<button type='submit' disabled={!vm.props.valid} className={`form-control btn btn-black color-white`}>Sign up</button>
				</div>
			</div>
		);
	}
}

















