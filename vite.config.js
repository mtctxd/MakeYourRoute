import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/MakeYourRoute/',
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
  },
})