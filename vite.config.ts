/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
      '@components': path.resolve(__dirname, './src/components'),
      '@ownTypes': path.resolve(__dirname, './src/types'),
      '@data': path.resolve(__dirname, './src/data'),
      '@starterFiles': path.resolve(__dirname, './starter_files'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    browser: {
      enabled: true,
      instances: [
        { browser: 'edge' },
      ],
    },
  }
})
