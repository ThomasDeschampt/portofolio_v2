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
          "/script/three.module.js",
          "/three.module.js",
          "/static/experiences/designer_farmer/rapport.pdf"
          "static/experiences/designer_farmer/rapport.pdf"
        ],
    }
  }
})
