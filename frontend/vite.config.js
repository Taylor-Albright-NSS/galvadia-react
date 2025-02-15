import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ['sequelize', 'wkx', 'buffer']
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['sequelize', 'fs', 'path'], // Prevents bundling server-only modules
    },
  },
  resolve: {
    alias: {
      '@backend': undefined, // Ensure backend is NOT aliased
    },
  },
})
