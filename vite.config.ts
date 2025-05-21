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
  define: {
    'window.settings': JSON.stringify({
      title: '',
      description: '',
      minimumPrice: 0,
      deliveryPrice: 0,
      isWithStock: true,
      isOpenWorld: false,
      email: 'emanuelstudio.sales@gmail.com',
      location: '',
      phoneSupport: '02-6719471',
      fax: '',
      footerDescription1: '',
      footerDescription2: '',
      footerDescription3: '',
      primaryColor: '#1e3465',
      secondaryColor: '#ffffff',
      oneSignalKey: '',
      paymentSystem: 'none',       // "NONE" | "YAD_SARIG" | "TRANZILLA"
      erp: 'PRIORITY',              // SAP | PRIORITY | HASAVSHEVET
      categoryLvlsNumber: 3,        // 1 | 2 | 3
      showCategoryNavBar: false,
      homePageAllCategoriesComponent: true,
      allowRegistration: true,
    })
  },
})
