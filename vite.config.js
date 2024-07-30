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
      '/topics.json': 'http://localhost:3000',
      '/blogs.json': 'http://localhost:3000',
      '/lastMessages.json': 'http://localhost:3000',
      '/createUser': 'http://localhost:3000',
      '/login': 'http://localhost:3000',
      '/feed': {
        target: 'https://twitter1-g0o3.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/feed/, ''),
      },
      '/clearCookie': 'http://localhost:3000',
    },
  },
});
