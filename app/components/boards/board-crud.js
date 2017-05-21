import React from 'react';
import Quill from 'quill';
import Button from '../button';
import Auth from '../../services/auth.service';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import './boards.component.less';

export default class Component extends React.Component {
	constructor(props) {
		super(props);
		this.editor;
		this.$auth = new Auth();
		this.timer;
		this.amIAuthor = false;
	}
	componentWillMount() {
	}
	componentDidMount() {
		this.editor = new Quill('#editor', {
			modules: {
				toolbar: [
					[{ 'size': ['small', false, 'large', 'huge'] }],
					[{ header: [1, 2, 3, 4, 5, 6, false] }],
					['bold', 'italic', 'underline'],
					['image', 'code-block'],
					[{ list: 'ordered' }, { list: 'bullet' }, {'align': []}],
				]
			},
			placeholder: 'Compose your writing...',
			theme: 'snow'  // or 'bubble'
		});
		this.updatePost();
		this.syncEditorPhase();
	}
	updatePost() {
		let title = document.querySelector('input.title');
		this.timer = setInterval(()=>{
			if (this.props.post.title) {
				title.value = this.props.post.title;
				this.editor.setContents(this.props.post.delta);
				this.validateAuthor();
				clearInterval(this.timer);
			}
		}, 100);
	}
	validateAuthor() {
		let payload = this.$auth.getPayload();
		try {
			if (this.props.post.author === payload._id) {
				this.amIAuthor = true;
			}
		}	catch (err) {
			this.amIAuthor = false;
		}
		console.log(this.props.post.author);
	}
	syncEditorPhase() {
		if (this.props.state === "view") {
			this.editor.enable(false);
			var toolbar = this.editor.getModule('toolbar').container;
			toolbar.style.display = 'none';
			this.editor.container.style.borderTop = '1px solid #ccc';
		}
	}
	render() {
		this.validateAuthor();
		let button;
		switch(this.props.state) {
			case "view":
				button = this.amIAuthor ? (
					<Button href={`/board/${this.props.type}/edit/${this.props.post._id}`} className='btn-white color-red' faClassName='fa-pencil' text='Edit'/>
				) : "";
				break;
			case "create":
				button = (
					<Button onClick={()=>{this.handleSubmit()}} className='btn-white color-red' faClassName='fa-pencil' text='Compose'/>
				);
				break;
			case "edit":
				button = this.amIAuthor ? (
					<Button onClick={()=>{this.handleEdit()}} className='btn-white color-red' faClassName='fa-pencil' text='Edit'/>
				) : "";
				break;
			default:
				break;
		}
		return (
			<section className='board wrap'>
				<div className='crud'>
					<input className='title form-control' disabled={this.props.state === "view" ? true : false} placeholder='Title'/>
					<div id='editor'>
					</div>
					<div className='warning'>
						<p>
							온라인상의 나는 또 다른 나입니다. 공공의 안전을 해치거나 타인에게 명예를 훼손하거나 불쾌감을 내포한 게시글은 민사 형사상의 불이익을 초래할수 있으니 유념하여 주시기 바랍니다.
						</p>
					</div>
					{button}
				</div>
			</section>
		);
	}
	handleSubmit() {
		let post = {
			title: document.querySelector('.title').value,
			delta: this.editor.getContents(),
		};
		this.props.CRUD({
			method: "post",
			post: post,
		});
	}
	handleEdit() {
		let post = {
			title: document.querySelector('.title').value,
			delta: this.editor.getContents(),
		};
		this.props.CRUD({
			method: "put",
			post,
		}, `/${this.props.post._id}`);
	}
}
