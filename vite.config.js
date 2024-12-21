import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/econraddiao.github.io/', 
  build: {
    outDir: "docs",
    rollupOptions: {
      external: [
        "vue3-carousel"
      ]
    }
  }
})