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
      '/feed': {
        target: 'https://twitter1-g0o3.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/feed/, ''),
      },
    },
  },
});
