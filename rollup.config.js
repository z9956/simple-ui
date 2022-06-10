import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const plugins = [
	resolve(),
	json(),
	commonjs({
		include: /node_modules/,
	}),
	typescript({
		tsconfig: './tsconfig.json',
	}),
	babel({
		babelHelpers: 'bundled',
		extensions,
		exclude: 'node_modules/**',
		presets: [
			'@babel/preset-env',
			'@babel/preset-react',
			'@babel/preset-typescript',
		],
	}),
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
