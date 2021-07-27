const webpack = require('webpack');
const chalk = require('chalk');

const configFactory = require('../config/webpack.config');
const config = configFactory('production');

console.log(chalk.blue('Creating an optimized production build...'));

webpack(config).run((err, status) => {
	let messages;

	if (err) {
		if (err.message) {
			messages = {
				errors: [err.message],
				warnings: [],
			};
		}
	} else {
		messages = status.toJson({ all: false, warnings: true, errors: true });
	}

	const errors = messages.errors;
	const warnings = messages.warnings;

	if (warnings) {
		warnings.forEach((message) => {
			console.log(chalk.yellow(message.message));
		});
	}

	if (errors) {
		errors.forEach((message) => {
			console.log(chalk.red(message.message));
		});
	}
});
