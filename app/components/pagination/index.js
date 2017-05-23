import React from 'react';

export default class Component extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			paginationArr: [],
		};
	}
	componentWillMount() {
	}
	componentDidMount() {
		this.init();
	}
	init () {
		let start = 1;
		let end = 5;
		while (start <= end) {
			let _tmp = Object.assign({}, this.state);
			this.state.paginationArr.push(start);
			this.setState(_tmp);
			start++;
		}
	}
	navigatePage(delta) {
		if (this.state.paginationArr[0] + delta === 0) return;
		let _tmp = Object.assign({}, this.state);
		_tmp.paginationArr = _tmp.paginationArr.map(val=>{
			return val + delta;
		});
		this.setState(_tmp, ()=>{
			this.props.loadPostArr(this.state.paginationArr[0]);
		});
	}
	render() {
		return (
			<div className='pagination-con row'>
				<a className='btn btn-pagination' onClick={()=>this.navigatePage(-1)}>&lt;</a>
				{this.state.paginationArr.map((val, idx)=>{
					return <a className='btn btn-pagination' key={idx}>{val}</a>;
				})}
				<a className='btn btn-pagination' onClick={()=>this.navigatePage(1)}>&gt;</a>
			</div>
		);
	}
}
