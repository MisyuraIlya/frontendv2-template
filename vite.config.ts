// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


const fullReloadAlways = { // FIX HMR MODAL PROVIDER ERROR
  handleHotUpdate({ server } : {server:any}) {
    server.ws.send({ type: "full-reload" });
    return [];
  },
};

export default defineConfig({
  // @ts-ignore
  plugins: [react(), fullReloadAlways],
})
