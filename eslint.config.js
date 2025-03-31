import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'

export default tseslint.config(
	{
		ignores: [
			'dist'
		]
	},
	{
		extends: [
			js.configs.recommended,
			...tseslint.configs.recommended
		],
		files: [
			'**/*.{ts,tsx}'
		],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		plugins: {
			'react-hooks': reactHooks
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			// Errors
			'array-bracket-newline': [
				'error',
				'consistent'
			],
			'array-bracket-spacing': [
				'error',
				'always'
			],
			'array-element-newline': [
				'error',
				'consistent'
			],
			'arrow-parens': [
				'error',
				'as-needed'
			],
			'comma-dangle': [
				'error',
				'never'
			],
			'indent': [
				'error',
				'tab',
				{
					'SwitchCase': 1
				}
			],
			'jsx-quotes': [
				'error',
				'prefer-single'
			],
			'no-trailing-spaces': [
				'error'
			],
			'object-curly-spacing': [
				'error',
				'always'
			],
			'quotes': [
				'error',
				'single'
			],
			'semi': [
				'error',
				'always'
			],
			// Warnings
			'no-console': [
				'warn',
				{
					'allow': [
						'warn',
						'error'
					]
				}
			],
			'no-debugger': 'warn',
			'no-warning-comments': [
				'warn',
				{
					"terms": [
						"todo",
						"hack",
						"fix",
						"fixme",
						"xxx"
					]
				}
			],
			'sort-imports': [
				'warn',
				{
					'allowSeparatedGroups': true,
					'memberSyntaxSortOrder': [
						'all',
						'multiple',
						'single',
						'none'
					]
				}
			]
		}
	}
)
