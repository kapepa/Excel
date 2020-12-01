const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = merge(common, {
	mode: 'production',
	devtool: 'source-map',
	output: {
		publicPath: path.resolve(__dirname, 'dist'),
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{ from: "src/assets/img/", to: "assets/img/[name].[hash].[ext]" },
			],
		}),
	]
});