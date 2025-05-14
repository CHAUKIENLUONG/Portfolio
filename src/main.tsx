import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AOSInit from './components/AOSInit'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AOSInit />
    <App />
  </StrictMode>,
)
