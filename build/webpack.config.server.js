const path = require('path');

module.exports = {
  // 打包后代码运行环境
  target: 'node',
	entry: {
		app: path.join(__dirname, '../client/server-entry.js'),
	},
	output: {
		filename: 'server-entry.js',
		path: path.join(__dirname, '../dist'),
    publicPath: '/public',
    // 模块化规范
    libraryTarget: 'commonjs2'
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
}