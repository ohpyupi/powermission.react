import React from 'react';
import $ from 'jquery';
import 'snackbarjs';
import 'snackbarjs/dist/snackbar.min.css';
import 'snackbarjs/themes-css/material.css';

export default class ErrorService {
	constructor(stateService) {
		this._stateService = stateService;
	}
	flash(message, ...args) {
		let vm = this;
		let options = {
			content: message,
			style: 'snackbar',
			timeout: 2000,
		};
		$.snackbar(options);
		if (args.length > 0) {
			let params = args[1] || {};
			vm._stateService.go(args[0], params);
		}
	}
}
