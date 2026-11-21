'use strict';

const js = require('@eslint/js');
const jest = require('eslint-plugin-jest');
const globals = require('globals');

module.exports = [
  {
    ignores: ['_coverage/', 'node_modules/'],
  },
  js.configs.recommended,
  {
    files: ['**/*.js'],
    plugins: {jest},
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
        ...globals.jest,
        ...globals.es2015,
        any: 'readonly',
        Promise: 'readonly',
      },
    },
    rules: {
      // ESLint 9+ reports unused catch bindings by default; the previous
      // ESLint 7 setup did not, and the code intentionally uses `catch (e) {}`.
      'no-unused-vars': ['error', {caughtErrors: 'none'}],
    },
  },
];
