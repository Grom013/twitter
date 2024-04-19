import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: './public',
    emptyOutDir: false,
  },
  plugins: [react()],
  server: {
    proxy: {
      '/topics': 'http://localhost:3000',
      '/blogs': 'http://localhost:3000',
      '/lastMessages': 'http://localhost:3000',
    },
  },
});
