const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isProductionMode = process.env.NODE_ENV === "production";

module.exports = {	
	entry: {
		app: ["@babel/polyfill", "./src/index.ts"],
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'assets/js/[name].[contenthash].js',
	},
	module: {
    rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets:  [
								['@babel/preset-env', { targets: "defaults" }],
							],
							plugins: ['@babel/plugin-proposal-class-properties'],
						},
					},
					"source-map-loader"
				]
			},
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							transpileOnly: true
						},
					},
				],
			},
			{
				test: /\.((c|sa|sc)ss)$/i,
				exclude: /node_modules/,
				use: [
					isProductionMode ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader',
          'postcss-loader',
          'sass-loader',
				],
      },
			{
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
				loader: 'file-loader',
				options: {
					outputPath: 'assets/img/',
					name: '[name].[ext]',
        },
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				loader: 'file-loader',
				options: {
					outputPath: 'assets/fonts/',
					name: '[name]/[name].[ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
			},
		},
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			favicon: 'src/assets/img/bpa-free.png',
			inject: 'head',
			filename: 'index.html',
      template: 'src/index.html'
		}),
		new MiniCssExtractPlugin({
			filename: isProductionMode ? '[name].css' : 'assets/style/[name].[contenthash].css',
			chunkFilename: isProductionMode ? '[id].css' : 'assets/style/[id].[contenthash].css',
		}),
	],
};