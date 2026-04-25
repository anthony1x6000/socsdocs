import useDopamineStore from './store/useDopamineStore';

import { Shadertoy } from 'react-shadertoy';

import {PageTitle} from './components/ui/Title';
import {Button} from './components/ui/ButtonPrimary';
import {Slider} from './components/ui/DopamineSlider';

import { BackgroundMusic } from './components/BackgroundMusic';

import './App.css';
import { SettingsBar } from './components/ui/SettingsBar';


function App() {
  const level = useDopamineStore((state) => state.level);
  
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <BackgroundMusic />
      <Shadertoy className='hero-background' fragmentShader="back.glsl" style={{ width: '100%', height: '100%' }} />
      <PageTitle text="cool title" level={level} />
      <Button text="Button click me!" onClick={() => console.log("Button clicked!")} />

      <SettingsBar />
    </div>
  )
}

export default App
