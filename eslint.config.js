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
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],
			'semi': [
				'error',
				'always'
			],
			'comma-dangle': [
				'error',
				'never'
			],
			'quotes': [
				'error',
				'single'
			],
			'object-curly-spacing': [
				'error',
				'always'
			],
			'indent': [
				'error',
				'tab',
				{
					'SwitchCase': 1
				}
			],
			'no-tabs': [
				'error',
				{
					'allowIndentationTabs': true
				}
			],
			'@typescript-eslint/non-nullable-type-assertion-style': 'off',
			'arrow-parens': [
				'error',
				'as-needed'
			],
			'no-trailing-spaces': [
				'error'
			],
			'array-bracket-spacing': [
				'error',
				'always'
			],
			'array-element-newline': [
				'error',
				'consistent'
			],
			'array-bracket-newline': [
				'error',
				'consistent'
			],
			'jsx-quotes': [
				'error',
				'prefer-single'
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
			'no-warning-comments': 'warn',
			'no-debugger': 'warn',
			'no-console': [
				'warn',
				{
					'allow': [
						'warn',
						'error'
					]
				}
			],
			'max-len': [
				'warn',
				{
					'code': 200
				}
			],
			'react/react-in-jsx-scope': 'off',
			'@typescript-eslint/no-unsafe-call': 'off',
			'@typescript-eslint/no-unsafe-member-access': 'off',
			'@typescript-eslint/no-unsafe-member-argument': 'off',
			'@typescript-eslint/no-unsafe-return': 'off'
		}
	}
)
