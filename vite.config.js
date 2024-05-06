import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import viteSvgr from 'vite-plugin-svgr';
import { fileURLToPath } from 'url';
import mkcert from 'vite-plugin-mkcert';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [viteSvgr({
    svgrOptions: {
      // svgr options
    },
  }), react(), mkcert(),],

  resolve: {
    alias: {
      // for TypeScript path alias import like : @/x/y/z
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        dir: './dist',
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          }
          return `assets/[name].[hash].[extname]`;
        },
        chunkFileNames: 'assets/[name].[hash].js',

        entryFileNames: 'assets/[name].[hash].js',
      },
    },
  },

  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
    preprocessorOptions: {
      scss: {
        additionalData:
          '@import "./src/scss/variables.scss";\n@import "./src/scss/mixins.scss";\n@import "./src/scss/functions.scss";',
      },
    },
  },
  server: {
    port: 5173,
    https: true,
    proxy: {
      '*': {
        target: 'https://vortex.korabli.su',
        changeOrigin: true,
        secure: true,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log(
              'Received Response from the Target:',
              proxyRes.statusCode,
              req.url
            );
          });
        },
      },
    },
  },
});
