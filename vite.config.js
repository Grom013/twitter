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
      '/topics.json': '/topics.json',
      '/blogs.json': '/blogs.json',
      '/lastMessages.json': '/lastMessages.json',
    },
  },
});
