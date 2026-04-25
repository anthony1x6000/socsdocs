import { Shadertoy } from 'react-shadertoy';

import {PageTitle} from './components/ui/Title';

import { BackgroundMusic } from './components/BackgroundMusic';

import './App.css';
import { SettingsBar } from './components/ui/SettingsBar';
import Subtitle from './components/ui/Subtitle';
import FlexBox from './components/ui/FlexBox';


function App() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <BackgroundMusic />
      <Shadertoy className='hero-background' fragmentShader="back.glsl" style={{ width: '100%', height: '100%' }} />
      
      <PageTitle className='mt-[3em]'/>
      <FlexBox className='gap-[2em]'>
        <Subtitle text="COME HERE TO STUDY" />
        <Subtitle text="LOGIN" />
        <Subtitle text="SIGN UP" />
      </FlexBox>
      

      <SettingsBar />
    </div>
  )
}

export default App
