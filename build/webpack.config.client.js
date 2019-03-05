const path = require('path');
const webpack = require('webpack');
const HtmlPlugin  = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const config = {
	entry: {
		app: path.join(__dirname, '../client/app.js'),
	},
	output: {
		filename: '[name].[hash].js',
		path: path.join(__dirname, '../dist'),
		publicPath: '/public/'
	},
	module: {
		rules: [
			{
				test: /.(js|jsx)$/,
				loader: 'eslint-loader',
				enforce: 'pre', //代码编译前执行eslint校验
				exclude: [
					path.resolve(__dirname, '../node_modules')
				]
			},
			{
				test: /.jsx$/,
				loader: 'babel-loader',
			},
			{
				test: /.js$/,
				loader: 'babel-loader',
				exclude: [
					path.join(__dirname, '../node_modules')
				],
			}
		],
	},
	plugins: [
		new HtmlPlugin({
			template: path.join(__dirname, '../client/template.html')
		})
	]
}

if (isDev) {
	config.entry = {
		app: [
			'react-hot-loader/patch',
			path.join(__dirname, '../client/app.js'),
		],
	};
	config.devServer = {
		host: '0.0.0.0',
		port: '8888',
		contentBase: path.join(__dirname, '../dist'),
		hot: true,
		overlay: {
			errors: true,
		},
		publicPath: '/public',
		historyApiFallback: {
			index: '/public/index.html',
		}
	};
	config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;