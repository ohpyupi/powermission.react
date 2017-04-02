import React from 'react';
import NavService from '../../services/nav.service';

const nav = new NavService();

export default class PageBreadscrumb extends React.Component {
	constructor(props) {
		super(props);
		this.nav = nav.main[3];// nav object for media
	}
	render() {
		let _url = window.location.pathname;
		let parentName = this.nav.parentName;
		let childView = this.nav.children.filter((x)=>{
			if (x.url === _url) return true;
		})[0];
		console.log(parentName);
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
}
