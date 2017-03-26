import React from 'react';
import ReactDOM from 'react-dom';

import {UIRouter, UIView, UISref, UISrefActive, pushStateLocationPlugin} from 'ui-router-react';
import router from './app.config';

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './style.less';

router.start();

ReactDOM.render(
	<UIRouter router={router}>
		<UIView/>
	</UIRouter>,
	document.getElementById('app')
);
