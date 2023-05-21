module.exports = {
	'env': {
		'node': true,
		'es6': true,
		'jest': true
	},
	'extends': 'eslint:recommended',
	'overrides': [
	],
	'parserOptions': {
		'ecmaVersion': 2021,
		'sourceType': 'module'
	},
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'warn',
			'single',
		],
		'semi': [
			'error',
			'always'
		],
		'no-unused-vars': [
			'warn', { 'vars': 'local' }
		],
	}
};
