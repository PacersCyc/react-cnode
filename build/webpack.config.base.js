const path = require('path');

module.exports = {
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/public/',
  },
  resolve: {
    extensions: ['.js', '.jsx']
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