import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const config = [
  ...compat.extends(
    'eslint:recommended',
    'plugin:storybook/recommended',
    'plugin:@typescript-eslint/recommended',
    'next'
  ),
  {
    plugins: {
      prettier,
      '@typescript-eslint': typescriptEslint,
    },

    languageOptions: {
      globals: {
        React: 'readonly',
        JSX: 'readonly',
      },

      parser: tsParser,
    },

    rules: {
      'import/no-anonymous-default-export': [
        2,
        {
          allowObject: true,
        },
      ],

      '@typescript-eslint/no-empty-interface': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',

      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['^(?!\\.\\/)((?!.)[sS])*) ?$', '../.*'],
              message:
                "Relative imports outside the current directory are not allowed. Please us the '@/{RESOURCE}' syntax specified in tsconfig.json",
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.stories.@(ts|tsx|js|jsx|mjs|cjs)'],

    rules: {
      'storybook/hierarchy-separator': 'error',
    },
  },
];

export default config;
