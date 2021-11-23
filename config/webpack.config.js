const paths = require('./paths');
const webpack = require('webpack');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function (webpackEnv) {
	const isEnvDevelopment = webpackEnv === 'development';
	const isEnvProduction = webpackEnv === 'production';

	return {
		mode: webpackEnv,
		entry: paths.appIndex,
		resolve: {
			extensions: paths.moduleFileExtensions.map((ext) => `.${ext}`),
		},
		externals: [/^react\/.+$/, /^react-dom\/.+$/],
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					exclude: /(node_modules)/,
					loader: 'swc-loader',
					options: {
						jsc: {
							parser: {
								syntax: 'typescript',
								tsx: true,
								dynamicImport: true,
							},
							transform: {
								react: {
									runtime: 'automatic',
									refresh: isEnvDevelopment,
									importSource: '@emotion/react',
								},
							},
							target: 'es2019',
							loose: true,
						},
					},
				},
				{
					test: /\.(png|jpe?g|gif|webp)$/i,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: 'images/[name].[ext]',
								limit: 2024,
								publicPath: '../',
							},
						},
					],
				},
			],
		},
		plugins: [
			new webpack.optimize.ModuleConcatenationPlugin(),
			// new MiniCssExtractPlugin({
			// 	filename: 'styles/simple.css',
			// 	chunkFilename: '[id].css',
			// 	ignoreOrder: false,
			// }),
		],
		output: {
			path: isEnvProduction ? paths.appBuild : undefined,
			filename: isEnvProduction
				? 'simple.min.js'
				: isEnvDevelopment && 'simple.js',
			library: 'simple',
		},
	};
};
