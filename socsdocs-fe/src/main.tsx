import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { DopamineProvider } from './store/DopamineProvider'
import { SongProvider } from './utils/SongProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <DopamineProvider>
        <SongProvider>
          <App />
        </SongProvider>
      </DopamineProvider>
    </BrowserRouter>
  </StrictMode>,
)
