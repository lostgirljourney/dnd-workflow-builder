module.exports = {
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
		'airbnb',
		'airbnb/hooks',
		'airbnb-typescript',
		'plugin:prettier/recommended'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: './tsconfig.json' // path of tsconfig file
	},
	plugins: ['react-refresh'],
	rules: {
		'react-refresh/only-export-components': 'warn'
	}
};
