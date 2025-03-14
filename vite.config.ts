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
    // Add other configuration as needed
    browser: {
      enabled: true,
      // at least one instance is required
      instances: [
        { browser: 'edge' },
      ],
    },
  }
})
