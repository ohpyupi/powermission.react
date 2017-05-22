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

router.put('/:id', auth, (req, res, next)=>{
	Post.findById(req.params.id)
	.then(post=>{
		post.title = req.body.title;
		post.delta = req.body.delta;
		post.updatedAt = Date.now();
		return post.save();
	})
	.then(()=>{
		res.json({message: "Successfully updated."});
	})
	.catch(next);
});

router.put(`/numVisited/:id`, (req, res, next)=>{
	Post.findById(req.params.id)
	.then(post=>{
		post.numVisited++;
		return post.save();
	})
	.then(()=>{
		res.json({message: "Successfully updated."});
	})
	.catch(next);
});

router.get('/all/:category/:page', (req, res, next)=>{
	let perPage = 15;
	let page = req.params.page || 1;
	console.log(page);
	Post.find({category: req.params.category})
	.sort({createdAt: -1})
	.limit(perPage)
	.skip((page-1)*perPage)
	.populate('author')
	.exec((err, postArr)=>{
		if (err) return next(err);
		res.json({
			postArr,
		});
	});
});

router.post('/', auth, (req, res, next)=>{
	let post = new Post(req.body);
	post.author = req.payload._id;
	Post.count({category: post.category}).exec(function (err, count) {
		post.hId = count + 1;
		post.save(err=>{
			if (err) return next(err);
			return res.json({message: 'Successfully composed!'});
		});
	});
})

module.exports = router;
