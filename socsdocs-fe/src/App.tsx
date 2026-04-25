import useDopamineStore from './store/useDopamineStore';

import { Shadertoy } from 'react-shadertoy';

import {PageTitle} from './components/Title';
import {Button} from './components/ButtonPrimary';
import {Slider} from './components/DopamineSlider';

import './App.css';


function App() {
  const level = useDopamineStore((state) => state.level);
  
  return (
    <>
      <Shadertoy className='hero-background' fragmentShader="back.glsl" style={{ width: '100%', height: '100%' }} />
      <PageTitle text="cool title" level={level} />
      <Button text="Button click me!" onClick={() => console.log("Button clicked!")} />

      <Slider />
    </>
  )
}

export default App
