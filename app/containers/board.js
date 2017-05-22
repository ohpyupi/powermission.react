import React from 'react';
import MainNav from '../components/main-nav/main-nav.component';
import Footer from '../components/footer/footer.component';
import ErrorService from '../services/error.service';
import EyeCatch from '../components/eye-catch/eye-catch.component';
import PageBreadscrumb from '../components/page-breadscrumb/page-breadscrumb.component';
import Boards from '../components/boards/boards.component';
import BoardCrud from '../components/boards/board-crud';
import PostService from '../services/post';

export default class Board extends React.Component {
	constructor(props) {
		super(props);
		this.$stateParams = this.props.resolves.$stateParams;
		this.state = {
			postArr: [],
			post: {},
			page: 1,
		};
		this.boardType;
		this.crudType;
		this.postId;
		this.$error = new ErrorService(this.props.transition.router.stateService);
		this.$post = new PostService();
	}
	componentWillMount() {
		this.boardType = this.$stateParams.boardType;
		this.crud = this.$stateParams.crud;
		this.postId = this.$stateParams.id;
		this.init();
	}
	componentDidMount() {
	}
	init() {
		if (this.crud) {
			if (this.postId) this.loadPost();
		} else {
			this.loadPostArr(this.boardType, this.state.page);
		}
	}
	render() {
		let board;
		if (!this.crud) {
			board = <Boards type={this.boardType} postArr={this.state.postArr}/>
		} else {
			board = <BoardCrud type={this.boardType} state={this.crud} increaseNumVisited={()=>this.increaseNumVisited()} post={this.state.post} CRUD={(payload, url)=>this.CRUD(payload, url)}/>
		}
		return (
			<section id='board'>
				<MainNav _handleLogout={()=>{this._handleLogout()}}/>
				<EyeCatch page='board'/>
				<section className='container page-content'>
					<PageBreadscrumb page='board'/>
					{board}
				</section>
				<Footer/>
			</section>
		);
	}
	loadPostArr(boardType, page) {
		this.$post.CRUD({method: "get"}, `all/${boardType}/${page}`)
		.then(res=>{
			let _tmp = Object.assign({}, this.state);
			_tmp.postArr = res.data.postArr;
			this.setState(_tmp);
		})
		.catch(err=>{});
	}
	loadPost() {
		this.$post.CRUD({method: "get"}, `${this.postId}`)
		.then(res=>{
			let _tmp = Object.assign({}, this.state);
			_tmp.post = res.data;
			this.setState(_tmp);
		})
		.catch(err=>{
			console.log(err);
			this.$error.flash(err.data.message);
		});
	}
	increaseNumVisited() {
		this.$post.CRUD({
			method: "put", 
		}, `numVisited/${this.postId}`)
		.then(res=>{})
		.catch(err=>{
			console.log(err);
			this.$error.flash(err.data.message);
		});
	}
	_handleLogout() {
		let vm = this;
		vm.$error.flash('Successfully logged out.');
	}
	CRUD(payload, url) {
		payload.post.category = this.boardType;
		this.$post.CRUD(payload, url)
		.then(res=>{
			if (this.crud === "create") {
				this.$error.flash(res.data.message, 'board', {boardType: this.boardType});
			} else if (this.crud === "edit") {
				this.$error.flash(res.data.message, 'board-one', {boardType: this.boardType, crud: "view", id: this.postId});
			}
		})
		.catch(err=>{
			let message = err.response.data.message;
			this.$error.flash(message);
		});
	}
}












