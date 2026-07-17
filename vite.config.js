import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
       main: resolve(__dirname, 'index.html'),
       privacidad: resolve(__dirname, 'aviso-privacidad.html'),
       admision: resolve(__dirname, 'admision.html'),
       becas: resolve(__dirname, 'becas.html'),
       servicioSocial: resolve(__dirname, 'servicio-social.html'),
       titulacion: resolve(__dirname, 'titulacion.html')
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    watch: {
      // Ignorar archivos de imagen y videos
      ignored: [
        '**/public/img/**',
        '**/public/videos/**'
      ]
    }
  }
});