import { univerPlugin } from '@univerjs/vite-plugin';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  plugins: [react(), svgr(), univerPlugin({})],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    /**
     * 加载入口文件
     * ❌ 必须在main.tsx中引入一个less文件，这里的引入才会生效
     * ✅ 所以直接在main.tsx中加载入口文件吧。
     */
    // preprocessorOptions: {
    //   less: {
    //     charset: false,
    //     additionalData: `@import '@/assets/css/index.less';`
    //   }
    // }
  },
  build: {
    outDir: 'dist', // 输出目录
    assetsDir: 'assets', // 静态资源存放目录
    assetsInlineLimit: 4096, // 资源内联阈值
    cssCodeSplit: true, // 开启css拆分
    sourcemap: false, // 开启sourcemap
    minify: 'esbuild', // 压缩工具, terser压缩率更高1%-2%,esbuild压缩更快20-40 倍
  },
  esbuild: {
    /*
      打包生产环境移除 console、debugger
      https://www.cnblogs.com/guangzan/p/16633753.html
    */
    drop: mode === 'prod' ? ['console', 'debugger'] : [],
  },
}));
