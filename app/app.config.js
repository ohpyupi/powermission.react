import {UIRouterReact, servicesPlugin, pushStateLocationPlugin} from 'ui-router-react';

import Home from './containers/home';
import Auth from './containers/auth';

import AuthService from './services/auth.service';
import ErrorService from './services/error.service';


let router = new UIRouterReact();
router.plugin(servicesPlugin);
router.plugin(pushStateLocationPlugin);

const $auth = new AuthService();
const $error = new ErrorService(router.stateService);

let states = [
	{
		name: 'home',
		url: '/',
		component: Home,
		onEnter: (trans, state)=>{
		},
	},
	{
		name: 'auth',
		url: '/auth/:authType',
		component: Auth,
		onEnter: (trans, state)=>{
			if ($auth.isLoggedIn()) return $error.flash('Already signed in.', 'home');
		},
	}
];

router.urlRouter.otherwise("/");

states.forEach(state=>{
	router.stateRegistry.register(state);
});


export default router;
