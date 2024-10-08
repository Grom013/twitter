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
      '/topics.json': 'http://localhost:3000/topics.json',
      '/blogs.json': 'http://localhost:3000/blogs.json',
      '/posts': 'http://localhost:3000',
      '/createUser': 'http://localhost:3000',
      '/login': 'http://localhost:3000',
      '/feed': 'http://localhost:3000',
    },
  },
});
