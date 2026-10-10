import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import '@fontsource-variable/archivo/wdth.css'
import '@fontsource-variable/sora'
import './index.css'
import './premium.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
