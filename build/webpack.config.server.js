const path = require('path');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

module.exports = webpackMerge(baseConfig, {
  // 打包后代码运行环境
  target: 'node',
	entry: {
		app: path.join(__dirname, '../client/server-entry.js'),
  },
  externals: Object.keys(require('../package.json').dependencies),
	output: {
		filename: 'server-entry.js',
    // 模块化规范
    libraryTarget: 'commonjs2'
	},
})