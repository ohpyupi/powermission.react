const path = require('path');
const webpack = require('webpack');
require('dotenv').load();

module.exports = {
	entry: './app/app.module.js',
	output: {
		filename: 'webpack.bundle.js',
		path: path.resolve(__dirname, 'dist/js'),
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
		}),
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(process.env.NODE_ENV),
			GOOGLE_MAP_KEY: JSON.stringify(process.env.GOOGLE_MAP_KEY),
			//API_URL: JSON.stringify(process.env.NODE_ENV === "production" ? "https://jubleit-rest.herokuapp.com" : "http://localhost:7777"),
		}),
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
