import React from 'react';
import hfunc from '../../lib/hfunc';

export default class Component extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 1,
			number: 5,
			paginationArr: [],
		};
	}
	componentWillMount() {
		this.constructPaginationArr();
	}
	componentDidMount() {
	}
	constructPaginationArr(order=1) {
		let start = this.state.page;
		let _arr = [];
		if (order===1) {
			let end = start + this.state.number - 1;
			while (start <= end) {
				_arr.push(start);
				start++;
			}
		} else if (order===-1) {
			let end = start - this.state.number + 1;
			while (start >= end) {
				_arr.splice(0, 0, start);
				start--;
			}
		}
		let _tmp = Object.assign({}, this.state);
		_tmp.paginationArr = _arr;
		this.setState(_tmp);
	}
	navigatePage(delta) {
		if (delta === 0 || this.state.page + delta === 0) return;
		let _tmp = Object.assign({}, this.state);
		_tmp.page = this.state.page + delta;
		this.setState(_tmp, ()=>{
			let container = document.querySelector('.pagination-con');
			let active = container.querySelector('a.active');
			active.className = 'btn btn-pagination';
			if (this.state.page%this.state.number === 1 && delta > 0 ) {
				this.constructPaginationArr();
				let first = container.querySelectorAll('a')[1];
				first.className += ' active';
			} else if (this.state.page%this.state.number === 0 && delta < 0) {
				this.constructPaginationArr(-1);
				let last = container.querySelectorAll('a')[this.state.number];
				last.className += ' active';
			} else {
				let dest = hfunc.findSibling(active, delta);
				dest.className += ' active';
			}
			this.props.loadPostArr(this.state.page);
		});
	}
	render() {
		return (
			<div className='pagination-con row'>
				<a className='btn btn-pagination arrow' onClick={()=>this.navigatePage(-1)}>&lt;</a>
				{this.state.paginationArr.map((val, idx)=>{
					return <a onClick={()=>{this.navigatePage(val-this.state.page)}} className={`btn btn-pagination ${idx === 0 ? 'active': ''}`} key={idx}>{val}</a>;
				})}
				<a className='btn btn-pagination arrow' onClick={()=>this.navigatePage(1)}>&gt;</a>
			</div>
		);
	}
}


