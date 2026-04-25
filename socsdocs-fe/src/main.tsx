import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { DopamineProvider } from './store/DopamineProvider'
import { SongProvider } from './utils/SongProvider'
import { BackgroundMusic } from './components/BackgroundMusic'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <DopamineProvider>
        <SongProvider>
          <BackgroundMusic />
          <App />
        </SongProvider>
      </DopamineProvider>
    </BrowserRouter>
  </StrictMode>,
)
