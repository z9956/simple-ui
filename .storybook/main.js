/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
	stories: [
		// '../packages/components/**/**/*.mdx',
		// '../packages/components/**/*.stories.@(js|jsx|ts|tsx)',
		//TODO
		'../packages/components/button/Button.stories.tsx',
	],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/addon-a11y',
		'@storybook/addon-docs',
		'@storybook/addon-controls',
		'@storybook/addon-actions',
	],
	framework: {
		name: '@storybook/react-webpack5',
		options: {},
	},
	core: {
		disableTelemetry: true, // 👈 Disables telemetry
	},
	docs: {
		autodocs: 'tag',
	},
};
export default config;

// '@storybook/addon-a11y',
// 	'@storybook/addon-docs',
// 	'@storybook/addon-links',
// 	'@storybook/addon-essentials',
// 	'@storybook/addon-controls',
