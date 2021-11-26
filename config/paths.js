const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const buildPath = 'dist';

const moduleFileExtensions = [
	'web.mjs',
	'mjs',
	'web.js',
	'js',
	'web.ts',
	'ts',
	'web.tsx',
	'tsx',
	'json',
	'web.jsx',
	'jsx',
];

module.exports = {
	appBuild: resolveApp(buildPath),
	appComponents: resolveApp('components'),
	appIndex: resolveApp('components/index.tsx'),
	appSrc: resolveApp('components/dev'),
	moduleFileExtensions,
};
