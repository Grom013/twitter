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
      // Убедитесь, что указываете правильный URL вашего сервера на Render.com
      // Замените 'server_url' на фактический URL вашего сервера
      '/topics.json': 'https://dpg-co6qgumv3ddc73c79nr0-a.oregon-postgres.render.com/topics.json',
      '/blogs.json': 'https://dpg-co6qgumv3ddc73c79nr0-a.oregon-postgres.render.com/blogs.json',
      '/lastMessages.json': 'https://dpg-co6qgumv3ddc73c79nr0-a.oregon-postgres.render.com/lastMessages.json',
    },
  },
});
