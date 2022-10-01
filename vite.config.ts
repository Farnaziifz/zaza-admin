import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import * as path from 'path';

export default defineConfig({
  base: "/boomjar",
  plugins: [
    vue(),
    eslintPlugin(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: 'less',
        }),
      ],
      dts: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-color': '#ff003d',
        },
        javascriptEnabled: true,
      },
    },
  },
});
