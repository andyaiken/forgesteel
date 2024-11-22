import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
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
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
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
			'no-tabs': [
				'error',
				{
					'allowIndentationTabs': true
				}
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
			],
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],
			// Turned off
			'react/react-in-jsx-scope': 'off',
			'@typescript-eslint/no-unsafe-call': 'off',
			'@typescript-eslint/no-unsafe-member-access': 'off',
			'@typescript-eslint/no-unsafe-member-argument': 'off',
			'@typescript-eslint/no-unsafe-return': 'off',
			'@typescript-eslint/non-nullable-type-assertion-style': 'off'
		}
	}
)
