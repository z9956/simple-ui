const webpack = require('webpack');

const configFactory = require('../config/webpack.config');
const config = configFactory('production');

webpack(config).run((err) => {
	console.log(err);
});
