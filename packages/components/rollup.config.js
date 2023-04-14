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
	}),
	production && terser(),
];

const pkg = require('./package.json');
const libraryName = pkg.name;

export default [
	{
		input: './index.ts',
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
		input: 'dist/esm/index.d.ts',
		output: [{ file: 'dist/index.d.ts', format: 'esm' }],
		plugins: [dts()],
	},
];
