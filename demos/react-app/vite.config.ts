import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Point to the source components
      '@smg-automotive/components': path.resolve(__dirname, '../../src'),
      src: path.resolve(__dirname, '../../src'),
    },
  },
  server: {
    port: 3000,
    open: true,
    fs: {
      allow: ['../..'],
    },
  },
  define: {
    'process.env': {},
  },
});
