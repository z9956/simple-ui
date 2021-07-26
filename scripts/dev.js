const webpack = require('webpack');
const chalk = require('chalk');

const configFactory = require('../config/webpack.config');
const config = configFactory('development');

console.log(chalk.blue('Start watching...\n'));

webpack(config).watch(
	{
		aggregateTimeout: 300,
	},
	(err) => {
		if (err) console.log(chalk.red(err));
	},
);
