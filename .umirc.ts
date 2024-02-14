import { defineConfig } from "umi";

export default defineConfig({
  title: "CMC",
  routes: [
    { path: "/", component: "home" },
    { path: "/upload", component: "upload" },
    { path: "/login", component: "login",  layout: false, },
    { path: "/register", component: "register",  layout: false, },
  ],
  proxy: {  
    '/api': {
      target: "http://api.cc.nps.cxhelloworld.com/release/v1/",
      changeOrigin: true, // 开启代理  
      pathRewrite: {  
        '^/api': '' // 重定向路径  
      }  
    }  
  },
  plugins: [
    '@umijs/plugins/dist/initial-state',
    '@umijs/plugins/dist/model',
  ],
  model: {
  },
  npmClient: 'npm',
  codeSplitting: {
    jsStrategy: 'bigVendors',
  },
});


