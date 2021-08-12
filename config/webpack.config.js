const paths = require('./paths');
const webpack = require('webpack');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function (webpackEnv) {
	const isEnvDevelopment = webpackEnv === 'development';
	const isEnvProduction = webpackEnv === 'production';

	return {
		entry: paths.appIndex,
		resolve: {
			extensions: paths.moduleFileExtensions.map((ext) => `.${ext}`),
		},
		externals: [/^react\/.+$/, /^react-dom\/.+$/],
		module: {
			rules: [
				{
					test: /\.(js|mjs|jsx|ts|tsx)$/,
					include: paths.appComponents,
					loader: require.resolve('babel-loader'),
					exclude: /node_modules/,
				},
				// {
				// 	test: /\.css$/i,
				// 	use: [
				// 		{ loader: MiniCssExtractPlugin.loader },
				// 		{ loader: 'css-loader' },
				// 	],
				// },
				// {
				// 	test: /\.s[ac]ss$/i,
				// 	use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
				// },
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
