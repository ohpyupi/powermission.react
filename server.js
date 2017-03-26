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
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'dist')));

require('./models/Users');
require('./models/Posts');
require('./config/passport');

mongoose.connect(process.env.MONGODB_URI);

const auth = require('./routes/auth');
const posts = require('./routes/posts');

app.use('/api/auth', auth);
app.use('/api/posts', posts);

app.get('*', (req, res, next)=>{
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port);
console.log(`Server running on port: ${port}`);
