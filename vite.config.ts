import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    allowedHosts: ['.ngrok-free.app'],
    cors: true,
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components/'),
      '@types': path.resolve(__dirname, './src/types/'),
      'pages': path.resolve(__dirname, './src/pages/'),
    },
  },
});