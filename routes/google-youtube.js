require('dotenv').load();
const express = require('express'),
google = require('googleapis'),
dotenv = require('dotenv'),
router = express.Router();

router.get('/playlist/:listId', (req, res, next)=>{
	let listId = req.params.listId;
	let scopes = [
		`https://www.googleapis.com/auth/youtube.readonly`,
	];
	const youtube = google.youtube({
		version: 'v3',
		auth: 'AIzaSyDcajjTN8EmHwd4UbjeeJM3kVTK5xB6k50',//ohpyupi@gmail.com
	});
	youtube.playlistItems.list({
		part: 'snippet',
		playlistId: listId,//powermission-react-test
	}, (err, data, response)=>{
		if (err) return next(err.errors[0]);
		res.json(data);
	});
});

module.exports = router;
