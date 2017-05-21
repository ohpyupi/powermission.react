import React from 'react';
import Quill from 'quill';
import Button from '../button';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import './boards.component.less';

export default class Component extends React.Component {
	constructor(props) {
		super(props);
		this.editor;
	}
	componentWillMount() {
	}
	componentDidMount() {
		this.editor = new Quill('#editor', {
			modules: {
				toolbar: [
					[{ header: [1, 2, false] }],
					['bold', 'italic', 'underline'],
					['image', 'code-block'],
					[{ list: 'ordered' }, { list: 'bullet' }],
				]
			},
			placeholder: 'Compose your writing...',
			theme: 'snow'  // or 'bubble'
		});
	}
	render() {
		return (
			<section className='board wrap'>
				<div className='crud'>
					<input className='title form-control' placeholder='Title'/>
					<div id='editor'>
					</div>
					<div className='warning'>
						<p>
							온라인상의 나는 또 다른 나입니다. 공공의 안전을 해치거나 타인에게 명예를 훼손하거나 불쾌감을 내포한 게시글은 민사 형사상의 불이익을 초래할수 있으니 유념하여 주시기 바랍니다.
						</p>
					</div>
					<Button onClick={()=>this.handleSubmit()} className='btn-white color-red' faClassName='fa-pencil' text='Compose'/>
				</div>
			</section>
		);
	}
	handleSubmit() {
		let payload = {
			title: document.querySelector('.title').value,
			delta: this.editor.getContents(),
		};
	}
}
