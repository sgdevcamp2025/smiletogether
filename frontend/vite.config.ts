import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { fileURLToPath } from 'url';
import tailwindcss from 'tailwindcss';

// __dirname 대체
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],

  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // ESLint 플러그인 관련 옵션 비활성화
  server: {
    hmr: { overlay: false }, // Error Overlay 비활성화
  },
  // 개발 모드에서 ESLint 경고 비활성화
  esbuild: {
    legalComments: 'none',
    jsx: 'automatic',
  },
});
