import React from 'react';
import Button from '../button';
import './boards.component.less';

export default class BoardList extends React.Component {
	constructor(props) {
		super(props);
	}
	componentWillMount() {
	}
	render() {
		return (
			<section className='board wrap'>
				<div className='con'>
					<div className='upperpart row'>
						<div className='col center'>
							Number
						</div>
						<div className='col three center'>
							Title
						</div>
						<div className='col center'>
							Author
						</div>
						<div className='col center'>
							Date
						</div>
						<div className='col center'>
							Visit
						</div>
					</div>
					<div className='list col'>
						<div className='item row'>
							<div className='col center'>
								Number
							</div>
							<div className='col three center'>
								Title
							</div>
							<div className='col center'>
								Author
							</div>
							<div className='col center'>
								Date
							</div>
							<div className='col center'>
								Visit
							</div>
						</div>
					</div>
				</div>
				<div className='util col'>
					<Button className='btn-white color-red' href={`/board/${this.props.type}/create`} faClassName='fa-pencil' text='Write'/>
					<div className='pagination-con row'>
						<a className='btn btn-pagination'>&lt;</a>
						<a className='btn btn-pagination active'>1</a>
						<a className='btn btn-pagination'>2</a>
						<a className='btn btn-pagination'>3</a>
						<a className='btn btn-pagination'>4</a>
						<a className='btn btn-pagination'>5</a>
						<a className='btn btn-pagination'>&gt;</a>
					</div>
					<div className='searchbar-con row'>
						<input className='form-control'/>
						<button type='button' className='btn btn-white'>
							<i aria-hidden="true" className='fa fa-search'></i>
						</button>
					</div>
				</div>
			</section>
		);
	}
}















