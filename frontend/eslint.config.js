import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tsEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  js.configs.recommended, // 기본 JavaScript 설정
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '.cursor/**',
      'public/**',
      '**/*.config.js',
      'vite.config.ts',
      'postcss.config.js',
      'tailwind.config.js',
      '**/*.d.ts',
      'coverage/**',
      'build/**',
      '.git/**',
      '**/*.lock.yaml',
      '**/*-lock.json',
    ],
  },
  {
    files: ['**/*.{ts,tsx}'], // TypeScript 파일 대상으로 설정
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: globals.browser,
      parser: tsParser,
      parserOptions: {
        // tsconfig.json에서 include에 있는 파일만 검사하도록 설정
        project: false, // 명시적인 project 참조를 제거하여 타입 체킹을 비활성화
        ecmaFeatures: {
          jsx: true,
        },
        // 최적화를 위한 캐싱 활성화
        tsconfigRootDir: '.',
        cacheFiles: true,
      },
    },
    linterOptions: {
      // 렌더링 성능 개선
      reportUnusedDisableDirectives: false,
      noInlineConfig: false,
    },
    plugins: {
      '@typescript-eslint': tsEslint,
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    settings: {
      react: {
        version: 'detect', // React 버전 자동 감지
      },
    },
    rules: {
      // 모든 규칙을 비활성화
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'react-refresh/only-export-components': 'off',
      'no-console': 'off', // console 사용 시 워닝 제거
      'no-unused-vars': 'off', // 사용되지 않는 변수 검사 비활성화
      // React 관련 규칙
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'off',
      'react-hooks/rules-of-hooks': 'off',
      'react-hooks/exhaustive-deps': 'off',
    },
  },
];
