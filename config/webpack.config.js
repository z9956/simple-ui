const paths = require('./paths');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function (webpackEnv) {
	const isEnvDevelopment = webpackEnv === 'development';
	const isEnvProduction = webpackEnv === 'production';

	return {
		entry: paths.appIndex,
		resolve: {
			exportsFields: paths.moduleFileExtensions.map((ext) => `.${ext}`),
		},
		externals: [/^react\/.+$/, /^react-dom\/.+$/],
		module: {
			rules: [
				{
					test: /\.(js|mjs|jsx|ts|tsx)$/,
					include: paths.appComponents,
					loader: require.resolve('babel-loader'),
				},
				{
					test: /\.s[ac]ss$/i,
					use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
				},
			],
		},
		output: {
			path: isEnvProduction ? paths.appBuild : undefined,
			filename: isEnvProduction
				? 'static/js/[name].[contenthash:8].js'
				: isEnvDevelopment && 'static/js/bundle.js',
		},
	};
};
