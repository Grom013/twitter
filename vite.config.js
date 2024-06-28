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
      '/topics.json': 'https://twitter1-g0o3.onrender.com/topics.json',
      '/blogs.json': 'https://twitter1-g0o3.onrender.com/blogs.json',
      '/lastMessages.json': 'https://twitter1-g0o3.onrender.com/lastMessages.json',
      '/createUser': 'https://twitter1-g0o3.onrender.com/createUser',
      '/login': 'https://twitter1-g0o3.onrender.com/login',
    },
  },
});
