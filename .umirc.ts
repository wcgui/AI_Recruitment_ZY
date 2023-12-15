import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/home", component: "home" },
    { path: "/login", component: "login" },
  ],
  npmClient: 'npm',
  codeSplitting: {
    jsStrategy: 'bigVendors',
  },
});
