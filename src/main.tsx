// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// import { registerSW } from 'virtual:pwa-register'

// const updateSW = registerSW({
//   onNeedRefresh() { /* prompt user to reload */ },
//   onOfflineReady() { /* show offline-ready UI */ },
// })


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
