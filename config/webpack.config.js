const paths = require('./paths');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = function (webpackEnv) {
	const isEnvDevelopment = webpackEnv === 'development';
	const isEnvProduction = webpackEnv === 'production';

	const devServerConfig = {
		static: paths.appBuild,
		compress: true,
		port: 3000,
		open: true,
	};

	return {
		mode: webpackEnv,
		entry: isEnvDevelopment ? paths.appDev : paths.appIndex,
		devServer: isEnvDevelopment ? devServerConfig : undefined,

		resolve: {
			extensions: paths.moduleFileExtensions.map((ext) => `.${ext}`),
		},
		externals: isEnvProduction ? [/^react\/.+$/, /^react-dom\/.+$/] : undefined,
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
		plugins: [isEnvDevelopment && new ReactRefreshPlugin()].filter(Boolean),
		output: {
			path: isEnvProduction ? paths.appBuild : undefined,
			// filename: isEnvProduction
			// 	? 'simple.min.js'
			// 	: isEnvDevelopment && 'simple.js',
			filename: 'simple.js',
			library: 'simple',
		},
	};
};
