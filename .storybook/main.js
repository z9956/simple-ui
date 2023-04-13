/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
	stories: [
		// '../packages/components/**/**/*.mdx',
		'../packages/components/**/*.stories.@(js|jsx|ts|tsx)',
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
	typescript: {
		// reactDocgen: 'react-docgen',
		reactDocgen: 'react-docgen-typescript',
		check: true,
	},
	features: {
		storyStoreV7: true,
	},
	framework: {
		name: '@storybook/react-webpack5',
		options: {},
	},
	core: {
		builder: '@storybook/builder-vite',
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
