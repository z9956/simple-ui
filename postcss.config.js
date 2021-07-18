module.exports = {
	plugins: [
		require('tailwindcss')('./tailwind.config.js'),

		// Error: PostCSS plugin tailwindcss requires PostCSS 8.
		// require('postcss-import'),
		// require('autoprefixer'),
		// require('cssnano'),
	],
};
