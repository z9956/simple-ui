const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin');

module.exports = {
	stories: [
		'../components/**/*.stories.mdx',
		'../components/**/*.stories.@(js|jsx|ts|tsx|mdx)',
	],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-knobs/register',
		{
			name: '@storybook/addon-docs', // new addon for docs
			options: {
				configureJSX: true,
				babelOptions: {},
				sourceLoaderOptions: null,
				transcludeMarkdown: true,
			},
		},
	],
	webpackFinal: async (config) => {
		config.module.rules.push({
			// 2a. Load `.stories.mdx` / `.story.mdx` files as CSF and generate
			//     the docs page from the markdown
			test: /\.(stories|story)\.mdx$/,
			use: [
				{
					loader: 'babel-loader',
					// may or may not need this line depending on your app's setup
					options: {
						plugins: ['@babel/plugin-transform-react-jsx'],
					},
				},
				{
					loader: '@mdx-js/loader',
					options: {
						compilers: [createCompiler({})],
					},
				},
			],
		});
		config.module.rules.push({
			test: /\.(stories|story)\.[tj]sx?$/,
			loader: require.resolve('@storybook/source-loader'),
			exclude: [/node_modules/],
			enforce: 'pre',
		});
		return config;
	},
	core: {
		builder: 'webpack5',
	},
};
