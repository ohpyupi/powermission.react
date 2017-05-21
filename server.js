require('dotenv').load();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const app = express();

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(express.static(path.join(__dirname, 'dist')));

require('./models/Users');
require('./models/Posts');
require('./config/passport');

mongoose.connect(process.env.MONGODB_URI);

const auth = require('./routes/auth');
const posts = require('./routes/posts');
const google_youtube = require('./routes/google-youtube');

app.use('/api/auth', auth);
app.use('/api/posts', posts);
app.use('/api/google-youtube', google_youtube);

app.get('*', (req, res, next)=>{
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.use((err, req, res, next)=>{
	console.error(err);
	res.status(err.status || 500);
	res.json({
		message: `Error: ${err.message}`,
	});
});

app.listen(port);
console.log(`Server running on port: ${port}`);
