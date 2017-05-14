import React from 'react';
import NavService from '../../services/nav.service';

const nav = new NavService();

export default class PageBreadscrumb extends React.Component {
	constructor(props) {
		super(props);
		this.nav = {};
	}
	componentWillMount() {
		this.init();
	}
	render() {
		let _url = window.location.pathname;
		console.log(_url);
		let parentName = this.nav.parentName;
		let childView = this.nav.children.filter((x)=>{
			if (x.url === _url) return true;
		})[0];
		return (
			<aside className='board-nav'>
				<h6>
					<a href='/'><i className='fa fa-home' aria-hidden='true'></i></a>
					&nbsp; HOME &nbsp;
					<small> > </small>
					&nbsp; {parentName} &nbsp; 
					<small> >  </small>
					&nbsp; {childView.name}
				</h6>
				<h1>{childView.name}</h1>
			</aside>
		)
	}
	init() {
		switch(this.props.page) {
			case "media":
				this.nav = nav.main[3];
				break;
			case "board":
				this.nav = nav.main[4];
				break;
			default:
				break;
		}
	}
}
