import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { DopamineProvider } from './store/useDopamineStore'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DopamineProvider>
      <App />
    </DopamineProvider>
  </StrictMode>,
)
