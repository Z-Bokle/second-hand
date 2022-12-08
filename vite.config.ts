import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ssl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), ssl()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    open: true,
    host: '0.0.0.0',
    port: 8080,
    //反向代理解决跨域问题
    proxy: {
      //
      "/api": {
        target: "",//后端接口地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        secure: false,
      },
      //百度AI平台接口域名
      "/baiduapi": {
        target: "https://aip.baidubce.com/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/baiduapi/, ""),
        secure: false,
      },
    },
  },
})
