import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPath from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPath()],
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
