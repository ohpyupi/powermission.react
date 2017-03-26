const passport = require('passport'),
express = require('express');
dotenv = require('dotenv'),
jwt = require('express-jwt'),
mongoose = require('mongoose'),
Post = mongoose.model('Post'),
router = express.Router();

dotenv.load();

var auth = jwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'payload',
});

router.get('/:id', (req, res, next)=>{
	Post.findById(req.params.id).exec((err, post)=>{
		if (err) return next(err);
		res.json(post);
	})
});

router.post('/get-all', (req, res, next)=>{
	let query = req.body || {};
	Post.find(query).populate('author').exec((err, posts)=>{
		if (err) return next(err);
		return res.json(posts);
	})
});

router.post('/create', auth, (req, res, next)=>{
	let post = new Post(req.body);
	post.author = req.payload._id;
	Post.count({category: post.category}).exec(function (err, count) {
		post.hId = count + 1;
		post.save(err=>{
			if (err) return next(err);
			return res.json({message: 'Successfully registered!'});
		});
	});
})

module.exports = router;
