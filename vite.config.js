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
<<<<<<< HEAD
      '/topics.json': 'http://dpg-co6qgumv3ddc73c79nr0-a.oregon-postgres.render.com',
      '/blogs.json': 'http://dpg-co6qgumv3ddc73c79nr0-a.oregon-postgres.render.com',
      '/lastMessages.json': 'http://dpg-co6qgumv3ddc73c79nr0-a.oregon-postgres.render.com',
=======
      '/topics.json': 'dpg-co6qgumv3ddc73c79nr0-adfdf.oregon-posdftgres.render.com',
      '/blogs.json': 'dpg-co6qgumv3ddc73c79nr0-a.oregon-postgres.render.com',
      '/lastMessages.json': 'dpg-co6qgumv3ddc73c79nr0-a.oregon-postgres.render.com',
>>>>>>> 99ff920babea52d0e7a0e4f1c707e4455054a284
    },
  },
});
