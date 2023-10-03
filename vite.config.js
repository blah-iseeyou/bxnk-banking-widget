import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path';


export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/App.jsx'),
      name: 'bxnk-banking-widget',
      fileName: (format) => `bxnk-banking-widget.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React'
        }
      }
    }
  },
  plugins: [react()]
})