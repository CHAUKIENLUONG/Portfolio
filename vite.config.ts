import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/assets/img/*',
          dest: 'img'
        }
      ]
    })
  ],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('gsap')) return 'gsap'
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) return 'vendor-core'
          if (id.includes('react-redux') || id.includes('@reduxjs/toolkit')) return 'vendor-store'
          if (id.includes('react-icons')) return 'vendor-icons'
        }
      }
    }
  }
})
