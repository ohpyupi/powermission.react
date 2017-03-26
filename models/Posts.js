var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	title: String,
	category: String,
	markup: String,
	hId: String,
	isDeleted: {type: Boolean, default: false},
	createdAt: {type: Date, default: Date.now},
	numVisited: {type: Number, default: 0},
	author: {type: mongoose.Schema.Types.Mixed, ref: 'User'},
});

PostSchema.methods.deletePost = function (callback) {
	this.isDeleted = true;
	this.save(callback);
};

mongoose.model('Post', PostSchema);
