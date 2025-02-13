import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tsEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';

export default [
  js.configs.recommended, // 기본 JavaScript 설정
  {
    ignores: ['dist'], // 제외할 경로 설정
  },
  {
    files: ['**/*.{ts,tsx}'], // TypeScript 파일 대상으로 설정
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: globals.browser,
      parser: tsParser,
    },
    plugins: {
      '@typescript-eslint': tsEslint,
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier,
    },
    settings: {
      react: {
        version: 'detect', // React 버전 자동 감지
      },
    },
    rules: {
      ...tsEslint.configs.recommended.rules, // TypeScript ESLint 추천 규칙
      ...reactHooks.configs.recommended.rules, // React Hooks 추천 규칙
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/no-unused-vars': ['warn'], // 사용되지 않은 변수 경고
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ], // Prettier 에러 처리
      'no-console': ['warn'], // console 사용 시 워닝
    },
  },
];
