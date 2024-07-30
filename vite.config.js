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
      '/lastMessages.json': 'http://localhost:3000/lastMessages.json',
      '/createUser': 'http://localhost:3000/createUser',
      '/login': 'http://localhost:3000/login',
      '/feed': 'https://twitter1-g0o3.onrender.com/feed',
    },
  },
});
