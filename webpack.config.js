var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var production = process.env.NODE_ENV === 'dev';
var plugins = [];
if(production) {
    plugins = [
       //打包css
		new ExtractTextPlugin("app.css"),
		new HtmlWebpackPlugin({
			title: 'TodoMVC 练习',
			filename: '../index.html',
		    template: './src/index.html', // Load a custom template
		    inject: 'body'
		})
    ];
}else{
	plugins = [
		new CleanWebpackPlugin(['./dist']),
       //打包css
		new ExtractTextPlugin("../css/app.css"),
		new HtmlWebpackPlugin({
			title: 'TodoMVC 练习',
			filename: '../index.html',
		    template: './src/index.html', // Load a custom template
		    inject: 'body',
		    chunks:['app']
		}),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			}
		}),
    ];
}
module.exports = {
	devtool:'inline-source-map',
	entry:{
		'app': './src/index.js',
	},
	output:{
		path: path.resolve(__dirname, "dist/js"),
		filename: '[name].js',
		chunkFilename: 'app.async.[hash:6]',
		publicPath:'./js/'
	},
	module:{
		loaders:[
			{
				test:/\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets:['es2015']
				}
			},
			{
				test:/\.scss$/,
				loader:ExtractTextPlugin.extract("style", "css?sourceMap!sass?sourceMap")
			},
			{	test: /\.(jpg|png|gif)$/,
				loader: 'file!url?limit=8192'
			}
		]
	},
	plugins: plugins
	// plugins:[
	// 	//提取公共js
	// 	// new webpack.optimize.CommonsChunkPlugin({
	// 	// 	name:'common',
	// 	// 	filename:'common.js'
	// 	// }),
	// 	// new webpack.DefinePlugin({
	// 	//     'process.env': {
	// 	//         NODE_ENV: JSON.stringify('production')
	// 	//     }
	// 	// }),
	// 	new CleanWebpackPlugin(['./dist']),
	// 	//打包css
	// 	new ExtractTextPlugin("todo.css", {allChunks: true}),
	// 	new HtmlWebpackPlugin({
	// 		title: 'TodoMVC 练习',
	// 		filename: '../index.html',
	// 	    template: './src/index.html', // Load a custom template
	// 	    inject: 'body' // Inject all scripts into the body
	// 	})
	// ]
}