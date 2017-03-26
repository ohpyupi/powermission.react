var async = require('async');
var express = require('express');
var passport = require('passport');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var mongoose = require('mongoose');
const dotenv = require('dotenv');
var User = mongoose.model('User');
var router = express.Router();

dotenv.load();

var smtpConfig = {
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: process.env.ADMIN_EMAIL,
		pass: process.env.ADMIN_PASSWORD,
	},
};

var smtpTransport = nodemailer.createTransport(smtpConfig);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/sign-up', function (req, res, next) {
	User.findOne({username: req.body.username}, function (err, oldUser) {
		if (oldUser) {
			return res.status(401).json({message: 'Username is already taken'});
		} else {
			var user = new User();
			user.username = req.body.username;
			user.setPassword(req.body.password);
			user.save(function (err) {
				if (err) {return next(err);}
				return res.json({
					token: user.generateJWT(),
					message: 'Successfully registered.',
				});
			});
		}
	});
});

router.post('/sign-in', function (req, res, next) {
	passport.authenticate('local', function (err, user, info) {
		if (err) {return next(err);}
		if (user) {
			return res.json({
				token: user.generateJWT(),
				message: 'Successfully logged in.',
			});
		} else {
			return res.status(401).json({
				message: 'No such user found. Check your account information.',
			});
		}
	})(req, res, next);
});

router.post('/forgot', function (req, res, next) {
	async.waterfall([
		function (done) {
			crypto.randomBytes(20, function (err, buf) {
				var token = buf.toString('hex');
				done(err, token);
			});
		},
		function (token, done) {
			User.findOne({username: req.body.username}, function (err, user) {
				if (!user) {
					return res.status(401).json({message: "No user is found. Check your username."});
				}
				user.resetPasswordToken = token;
				user.resetPasswordExpires = Date.now() + 3600000;
				user.save(function (err) {
					done(err, token, user);
				});
			});
		},
		function (token, user, done) {
			var mailOptions = {
				to: user.username,
				from: 'Power Mission <powermission.assistant@gmail.com>',
				subject: 'Power Mission password reset',
				text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'+'Please click on the following link, or paste this into your browser to complete the process:\n\n'+'http://' + req.headers.host + '/reset/' + token + '\n\n'+'If you did not request this, please ignore this email and your password will remain unchanged.\n',
			};
			smtpTransport.sendMail(mailOptions, function (err) {
				done(err);
			});
		}
	], function (err) {
		if (err) {return next(err);}
		return res.status(200).json({
			message: 'Password reset link has been forwarded to your email.'
		});
	});
});

router.post('/reset/:token', function (req, res) {
	async.waterfall([
		function (done) {
			User.findOne({
				resetPasswordToken: req.body.token,
				resetPasswordExpires: { $gt: Date.now() },
			}, function (err, user) {
				if (!user) {
					return res.status(401).json({message: 'Token unauthorized or expired.'});
				}
				user.setPassword(req.body.password);
				user.resetPasswordToken = undefined;
				user.resetPasswordExpires = undefined;
				user.save(function (err) {
					done(err, user);
				});
			});
		},// first function done
		function (user, done) {
			var mailOptions = {
				to: user.username,
				from: 'Power Mission <powermission.assistant@gmail.com>',
				subject: 'Power Mission password reset',
				text: 'Hello, \n\n' + 'This is a confirmation that the password for your account '+user.username+ ' has just been changed.\n',
			};
			smtpTransport.sendMail(mailOptions, function (err) {
				done(err);
			});
		},// second function done
	], function (err) {
			if (err) {return next(err);}
			return res.json({message: 'Your password has been reset!'});
	});
});



module.exports = router;




























