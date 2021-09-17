module.exports = {
	stories: [
		// '../components/**/*.stories.mdx',
		'../components/**/*.stories.@(js|jsx|ts|tsx)',
	],
	addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
	core: {
		builder: 'webpack5',
	},
};

module.exports = {
	stories: ['../components/**/*.stories.@(mdx|js|jsx|ts|tsx)'],
	addons: [
		'@storybook/addon-essentials',
		'@storybook/addon-storysource',
		'@storybook/addon-a11y',
	],
	skeletonWebpackConfig: {
		module: {
			rules: [
				{
					test: /\.m?[t|j]sx?$/,
					resolve: {
						fullySpecified: false,
					},
				},
				// {
				// 	test: /\.css$/,
				// 	use: ['style-loader', 'css-loader'],
				// },
				{
					test: /\.(png|jpe?g|gif|svg)$/i,
					use: [
						{
							loader: 'file-loader',
						},
					],
				},
				{
					test: /\.mdx/,
					use: [
						{
							loader: 'null-loader',
						},
					],
				},
			],
		},
	},
};
