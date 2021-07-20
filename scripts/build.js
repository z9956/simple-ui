const webpack = require('webpack');

const configFactory = require('../config/webpack.config');
const config = configFactory('production');

const compiler = webpack(config);

compiler.run((err, stats) => {
	console.log('err', err, stats);
});
