import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

const plugins = [
	postcss({
		extract: true,
		config: {
			path: './postcss.config.js',
		},
		extensions: ['.css'],
	}),
	resolve(),
	json(),
	commonjs(),
	typescript(),
	babel({ babelHelpers: 'bundled' }),
	production && terser(),
	replace({
		preventAssignment: true,
		'process.env.NODE_ENV': JSON.stringify('production'),
		__buildDate__: () => JSON.stringify(new Date()),
	}),
];

export default {
	input: 'components/index.tsx',
	output: [
		{
			file: 'dist/main.ems.js',
			format: 'esm',
			sourcemap: true,
		},
		{
			file: 'dist/main.umd.js',
			format: 'umd',
			name: 'main',
			sourcemap: true,
		},
	],
	plugins,
	exclude: 'node_modules',
};
