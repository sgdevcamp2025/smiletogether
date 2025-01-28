import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // TailwindCSS 및 기본 스타일
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
