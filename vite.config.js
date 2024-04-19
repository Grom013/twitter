import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    outDir: './public',
    emptyOutDir: false,
  },
  plugins: [react()],
  server: {
    proxy: {
      '/topics.json': 'http://dpg-co6qgumv3ddc73c79nr0-a.oregon-postgres.render.com/topics.json',
      '/blogs.json': 'http://dpg-co6qgumv3ddc73c79nr0-a.oregon-postgres.render.com/blogs.json',
      '/lastMessages.json': 'http://dpg-co6qgumv3ddc73c79nr0-a.oregon-postgres.render.com/lastMessages.json',
    },
  },
});
