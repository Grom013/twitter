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
      '/topics.json': 'https://twitter-a6rh.onrender.com/',
      '/blogs.json': 'https://twitter-a6rh.onrender.com/',
      '/lastMessages.json': 'https://twitter-a6rh.onrender.com/',
    },
  },
});
