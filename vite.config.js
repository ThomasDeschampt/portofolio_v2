// vite.config.js
const { resolve } = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
        external: [
          "/three/three.module.js",
          "../three/three.module.js",
          "/three.module.js",
        ],
    }
  }
})
