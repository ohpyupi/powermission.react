import React from 'react';
import MainNav from '../components/main-nav/main-nav.component';
import Footer from '../components/footer/footer.component';
import ErrorService from '../services/error.service';
import EyeCatch from '../components/eye-catch/eye-catch.component';
import PageBreadscrumb from '../components/page-breadscrumb/page-breadscrumb.component';
import Boards from '../components/boards/boards.component';
import BoardCrud from '../components/boards/board-crud';

export default class Board extends React.Component {
	constructor(props) {
		super(props);
		this.$stateParams = this.props.resolves.$stateParams;
		this.boardType;
		this.crudType;
	}
	componentWillMount() {
		this.boardType = this.$stateParams.boardType;
		this.crud = this.$stateParams.crud;
	}
	render() {
		let board;
		if (!this.crud) {
			board = <Boards type={this.boardType}/>
		} else {
			board = <BoardCrud/>
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
	_handleLogout() {
		let vm = this;
		vm.$error.flash('Successfully logged out.');
	}
}
