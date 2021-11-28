const Webpack = require('webpack');
const chalk = require('chalk');
const WebpackDevServer = require('webpack-dev-server');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const configFactory = require('../config/webpack.config.js');
const config = configFactory('development');

config.plugins.push(new HtmlWebpackPlugin());
const compiler = Webpack(config);

const devServer = new WebpackDevServer(config.devServer, compiler);

devServer.startCallback(() => {
	console.log(
		chalk.blue(
			`Successfully started server on http://localhost:${config.devServer.port}`,
		),
	);
});
