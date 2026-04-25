import { Shadertoy } from 'react-shadertoy';

import {PageTitle} from './components/ui/Title';

import { BackgroundMusic } from './components/BackgroundMusic';

import './App.css';
import { SettingsBar } from './components/ui/SettingsBar';


function App() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <BackgroundMusic />
      <Shadertoy className='hero-background' fragmentShader="back.glsl" style={{ width: '100%', height: '100%' }} />
      <PageTitle />

      <SettingsBar />
    </div>
  )
}

export default App
