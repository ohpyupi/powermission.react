const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
	entry: './app/app.module.js',
	output: {
		filename: 'webpack.bundle.js',
		path: path.resolve(__dirname, 'dist/js'),
	},
	plugins: [
		new Dotenv({
			path: './.env',
			safe: true,
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
		})
	],
	module: {
		loaders: [
		{
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			loader: "babel-loader",
			query: {
				presets: ['es2015', 'react']
			}
		},
		{
			test: /\.html$/,
			loader: "html-loader"
		},
		{
			test: /\.css$/, 
			loader: "style-loader!css-loader" 
		},
		{
			test: /\.less$/, 
			loader: "style-loader!css-loader!less-loader" 
		},
		{
			test: /\.scss$/,
			loader: "style-loader!css-loader!sass-loader",
		},
		{
			test: /\.(eot|svg|png|jpg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
			loader: 'url-loader'
		}
	]
	},
};
