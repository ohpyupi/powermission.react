const mongoose = require('mongoose'),
dotenv = require('dotenv'),
crypto = require('crypto'),
jwt = require('jsonwebtoken');

dotenv.load();

var UserSchema = new mongoose.Schema({
	createdAt: {type: Date, default: Date.now},
	editedAt: Date,
	deletedAt: Date,
	// general properties ending
	username: {type: String, lowercase: true, unique: true},
	role: {type:String, default: 'user'},//role - admin - manager - user
	hash: String,
	salt: String,
	resetPasswordToken: String,
	resetPasswordExpires: Date,
	// user's characteristics ending
	posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
	// related docs ending
});

UserSchema.methods.setPassword = function (password) {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function (password) {
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
	return this.hash === hash;
};

UserSchema.methods.generateJWT = function () {
	var today = new Date();
	var exp = new Date(today);
	exp.setDate(today.getDate() + 60);
	return jwt.sign({
		_id: this._id,
		username: this.username,
		exp: parseInt(exp.getTime()/1000),
	}, process.env.JWT_SECRET);
};

mongoose.model('User', UserSchema);
