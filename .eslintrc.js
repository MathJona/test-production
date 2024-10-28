export default {
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
	],
	rules: {
		'no-unused-vars': 'error',
		'no-undef': 'error',

		'consistent-return': 'error',
		eqeqeq: 'error',

		indent: ['error', 2],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],

		'@typescript-eslint/no-unused-vars': 'error',
		'@typescript-eslint/no-explicit-any': 'warn',
	},
};
