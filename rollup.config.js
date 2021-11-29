import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

const plugins = [
	resolve(),
	json(),
	commonjs({
		include: /node_modules/,
	}),
	typescript({
		tsconfig: './tsconfig.json',
		exclude: ['node_modules', 'dist'],
	}),
	babel({ babelHelpers: 'bundled' }),
	production && terser(),
];

const pkg = require('./package.json');
const libraryName = pkg.name;

export default [
	{
		input: 'components/index.tsx',
		output: [
			{
				file: pkg.main,
				format: 'cjs',
				name: libraryName,
				sourcemap: true,
			},
			{
				file: pkg.module,
				format: 'esm',
				name: libraryName,
				sourcemap: true,
			},
		],
		external: ['react', 'react-dom'],
		plugins,
	},

	{
		input: 'dist/esm/types/index.d.ts',
		output: [{ file: 'dist/index.d.ts', format: 'esm' }],
		plugins: [dts()],
	},
];
