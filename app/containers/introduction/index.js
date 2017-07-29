import React from 'react';
import MainNav from '../../components/main-nav/main-nav.component';
import EyeCatch from '../../components/eye-catch/eye-catch.component';
import PageBreadscrumb from '../../components/page-breadscrumb/page-breadscrumb.component';
import Footer from '../../components/footer/footer.component';
import ErrorService from '../../services/error.service';

import './styles.css';

export default class Introduction extends React.Component {
	constructor(props) {
		super(props);
		this.$error = new ErrorService(this.props.transition.router.stateService);
		this.lorem = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`;
	}
	render() {
		return (
			<section id='introduction'>
				<MainNav _handleLogout={()=>{this._handleLogout()}}/>
				<EyeCatch page='introduction'/>
				<section className='container page-content'>
					<PageBreadscrumb page='introduction'/>
					<div>
						<div className='header-con'>
							<h2>GLOCAL MISSION WITH IMPACT</h2>
							<h2>하나님의 영향력을 세상에 끼치는 교회</h2>
						</div>
						<div className='bible-con'>
							<p>
								GO THEREFORE AND MAKE DISCIPLES OF ALL NATIONS, BAPTIZING THEM IN THE NAME OF THE FATHER AND OF THE SON AND OF THE HOLY SPRIT, TEACHING THEM TO OBSERVE ALL THAT I HAVE COMMANDED YOU. AND BEHOLD, I AM WITH YOU ALWAYS, TO THE END OF THE AGE.
							</p>
							<p>
								Mathew 28:19 - 20
							</p>
						</div>
						<div className='power-icon-con'>
							<div className='power-icon'>
								<img src='/lib/img/angularjs.png'/>
								<p>
									POWER OF SPIRIT
								</p>
							</div>
							<div className='power-icon'>
								<img src='/lib/img/angularjs.png'/>
								<p>
									POWER OF SCENT
								</p>
							</div>
							<div className='power-icon'>
								<img src='/lib/img/angularjs.png'/>
								<p>
									POWER OF SKILL
								</p>
							</div>
						</div>
						<div className='verbiage-con'>
							<div className='verbiage'>
								<h3>능력교회는 하나님의 영향력을 세상에 끼치는 교회입니다.</h3>
								<hr/>
								<p>
									{this.lorem}
								</p>
							</div>
							<div className='verbiage'>
								<h3>능력교회는 개인, 가정, 이웃, 세계를 향해 나가는 교회입니다.</h3>
								<hr/>
								<p>
									{this.lorem}
								</p>
							</div>
							<div className='verbiage'>
								<h3>능력교회는 All Nations(다민족)이 모여서 예배하고, 다민족을 향해서 나아가는 교회입니다.</h3>
								<hr/>
								<p>
									{this.lorem}
								</p>
							</div>

						</div>
					</div>
				</section>
				<Footer/>
			</section>
		);
	}
	_handleLogout() {
		vm.$error.flash('Successfully logged out.');
	}
}
