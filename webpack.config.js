var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry:'',
	output:{

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
				loader:ExtractTextPlugin.extract("style", "css!sass")
			},
			{	test: /\.(jpg|png|gif)$/,
				loader: 'file!url?limit=8192'
			}
		]
	},
	plugins:[
		//提取公共js
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name:'common',
		// 	filename:'common.js'
		// }),
		//打包css
		new ExtractTextPlugin("todo.css", {allChunks: true})
	]
}