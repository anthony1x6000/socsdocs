import useDopamineStore from './store/useDopamineStore';

import { Shadertoy } from 'react-shadertoy';

import {PageTitle} from './components/Title';
import {Button} from './components/ButtonPrimary';

import './App.css';


function App() {
  const level = useDopamineStore((state) => state.level);
  const setLevel = useDopamineStore((state) => state.setLevel);
  
  return (
    <>
      <Shadertoy className='hero-background' fragmentShader="back.glsl" style={{ width: '100%', height: '100%' }} />
      <PageTitle text="cool title" level={level} />
      <Button text="Button click me!" onClick={() => console.log("Button clicked!")} />


      <div style={{ position: 'relative', zIndex: 1, padding: '20px' }}>
        <label htmlFor="dopamine-slider" style={{ color: 'white', display: 'block' }}>
          Dopamine Level: {level}
        </label>

        <input
          id="dopamine-slider"
          type="range"
          min="1"
          max="5"
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
        />
      </div>
    </>
  )
}

export default App
