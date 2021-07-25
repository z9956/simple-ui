const webpack = require('webpack');

const configFactory = require('../config/webpack.config');
const config = configFactory('production');

console.log('Creating an optimized production build...');

webpack(config).run((err, status) => {
	let messages;

	if (err) {
		messages = err.message;
	} else {
		messages = status.toJson({ all: false, warnings: true, errors: true });
	}
	console.log(messages);
});
