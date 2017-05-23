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
						{this.props.postArr.map(post=>{
							return (
								<a key={post._id} className='item row' href={`/board/${this.props.type}/view/${post._id}`}>
									<div className='col center'>
										{post.hId}
									</div>
									<div className='col three center'>
										{post.title}
									</div>
									<div className='col center'>
										{post.author.username}
									</div>
									<div className='col center'>
										{post.createdAt}
									</div>
									<div className='col center'>
										{post.numVisited}
									</div>
								</a>
							);
						})}
					</div>
				</div>
				<div className='util col'>
					<Button className='btn-white color-red' href={`/board/${this.props.type}/create`} faClassName='fa-pencil' text='Write'/>
					{this.props.children}
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















