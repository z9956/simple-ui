const paths = require('./paths');
const webpack = require('webpack');

module.exports = function (webpackEnv) {
	const isEnvDevelopment = webpackEnv === 'development';
	// const isEnvProduction = webpackEnv === 'production';

	return {
		// target: process.env.NODE_ENV === "development" ? "web" : "browserslist",
		mode: webpackEnv,
		entry: paths.appIndex,
		devServer: {
			static: paths.appBuild,
		},

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
			new webpack.HotModuleReplacementPlugin(),
		],
		output: {
			// path: isEnvProduction ? paths.appBuild : undefined,
			path: paths.appBuild,
			// filename: isEnvProduction
			// 	? 'simple.min.js'
			// 	: isEnvDevelopment && 'simple.js',
			filename: 'simple.js',
			library: 'simple',
		},
	};
};
