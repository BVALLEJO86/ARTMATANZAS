import { resolve } from 'node:path'
import { defineConfig } from 'vite'

// Dos entradas HTML: la misma app, con metadatos para compartir distintos en /ruta-local.
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ruta: resolve(__dirname, 'ruta-local.html')
      }
    }
  }
})
