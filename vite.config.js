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
      '/topics.json': 'dpg-co6qgumv3ddc73c79nr0-a.oregon-postgres.render.com',
      '/blogs.json': 'dpg-co6qgumv3ddc73c79nr0-a.oregon-postgres.render.com',
      '/lastMessages.json': 'dpg-co6qgumv3ddc73c79nr0-a.oregon-postgres.render.com',
    },
  },
});
