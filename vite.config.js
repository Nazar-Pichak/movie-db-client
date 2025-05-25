import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://nazar2025.pythonanywhere.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
