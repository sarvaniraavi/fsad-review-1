import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/fsad-review-1/', // <--- Add this exact line
  plugins: [react()],
})