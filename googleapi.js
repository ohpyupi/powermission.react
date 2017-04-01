require('dotenv').load();
const google = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
	process.env.GOOGLE_OAUTH_CLIENTID,
	process.env.GOOGLE_OAUTH_SECRET,
	process.env.GOOGLE_OAUTH_REDIRECT
);

const youtube = google.youtube({
	version: 'v3',
	auth: oauth2Client,
});

youtube.playlists.list({
	part: 'snippet',
	id: 'PL9gDOW4-QXIKjMWdIDIXk9PFc9RKb3-Xi',
}, (err, data, res)=>{
	if (err) return console.error(err);
});
