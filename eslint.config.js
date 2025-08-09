import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import stylistic from '@stylistic/eslint-plugin'
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
			stylistic.configs.recommended,
			...tseslint.configs.recommended
		],
		files: [
			'**/*.{ts,tsx}'
		],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			}
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
			'array-element-newline': [
				'error',
				'consistent'
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
			'@stylistic/array-bracket-spacing': [
				'error',
				'always'
			],
			'@stylistic/arrow-parens': [
				'error',
				'as-needed'
			],
			'@stylistic/comma-dangle': [
				'error',
				'never'
			],
			'@stylistic/indent': [
				'error',
				'tab',
				{
					'SwitchCase': 1
				}
			],
			'@stylistic/jsx-quotes': [
				'error',
				'prefer-single'
			],
			'@stylistic/semi': [
				'error',
				'always'
			],
			'@typescript-eslint/no-deprecated': [
				'error'
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
			// Off
			'@stylistic/brace-style': [
				'off'
			],
			'@stylistic/indent-binary-ops': [
				'off'
			],
			'@stylistic/jsx-indent-props': [
				'off'
			],
			'@stylistic/jsx-one-expression-per-line': [
				'off'
			],
			'@stylistic/jsx-wrap-multilines': [
				'off'
			],
			'@stylistic/computed-property-spacing': [
				'off'
			],
			'@stylistic/member-delimiter-style': [
				'off'
			],
			'@stylistic/max-statements-per-line': [
				'off'
			],
			'@stylistic/no-tabs': [
				'off'
			],
			'@stylistic/operator-linebreak': [
				'off'
			]
		}
	}
)
