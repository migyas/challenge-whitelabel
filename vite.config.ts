import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPath from 'vite-tsconfig-paths';
import {viteExternalsPlugin} from 'vite-plugin-externals';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPath(),
    viteExternalsPlugin({
      vue: 'Vue',
      react: 'React',
      'react-dom': 'ReactDOM',
      // value support chain, transform to window['React']['lazy']
      lazy: ['React', 'lazy'],
    }),
  ],
  envPrefix: 'REACT_',
  server: {
    port: 3000,
  },
  define: {
    global: {},
  },
  preview: {
    host: '0.0.0.0',
    port: 3333,
  },
});
