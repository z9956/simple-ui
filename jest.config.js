module.exports = {
	transform: {
		'^.+\\.(t|j)sx?$': '@swc/jest',
	},
	testMatch: ['<rootDir>/packages/components/**/*.test.{ts,tsx,js,jsx}'],
	// testEnvironment: 'jsdom',
	// collectCoverageFrom: ['packages/**/*.{ts,tsx}'],
	// moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	// modulePathIgnorePatterns: ['<rootDir>/examples'],
	// transform: {
	// 	'^.+\\.(ts|tsx|js|jsx)?$': '@swc-node/jest',
	// },
	// transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
	// setupFilesAfterEnv: [],
	// extensionsToTreatAsEsm: ['.ts', '.tsx'],
	//
	globals: {
		'ts-jest': {
			tsconfig: 'tsconfig.json',
		},
	},
};
