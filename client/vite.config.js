import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {    
    rollupOptions: 'https://autoescuela-fast.vercel.app/'
  }
})

window.addEventListener('vite:preloadError', (event) => {
  window.location.reload();
})
