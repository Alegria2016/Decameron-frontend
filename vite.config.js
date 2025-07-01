import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
  '@/views/hotels/HotelIndex.vue': path.resolve(__dirname, './src/views/hotels/HotelIndex.vue')
  }
  }
})