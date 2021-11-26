const configFactory = require('../config/webpack.config');
// const webpackConfig = configFactory('development');
const webpackConfig = configFactory('production');

module.exports = {
	stories: [
		'../components/**/*.stories.mdx',
		'../components/**/*.stories.@(js|jsx|ts|tsx)',
	],
	addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
	core: {
		hot: true,
		builder: 'webpack5',
	},
	webpackFinal: (config) => {
		return {
			...config,
			module: { ...config.module, rules: webpackConfig.module.rules },
		};
	},
};
