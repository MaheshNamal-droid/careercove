import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    server: {
        cors: {
          origin: '*',  // Allow all origins (or specify your frontend URL)
          methods: ['GET', 'POST', 'PUT', 'DELETE'],
        }
      }
});
