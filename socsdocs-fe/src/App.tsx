import { Shadertoy } from 'react-shadertoy';
import { motion } from 'framer-motion';
import { Routes, Route, Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import {PageTitle} from './components/ui/Title';

import './App.css';
import {SettingsBar} from './components/ui/SettingsBar';
import Subtitle from './components/ui/Subtitle';
import FlexBox from './components/ui/FlexBox';
import HorizontalLine from './components/ui/HorizontalLine';
import { useDopamineIntensity } from './store/useDopamineIntensity';
import LoginPage from './pages/LoginPage';

function HomePage() {
  return (
    <>
      <PageTitle className='mt-[3em]'/>
      <FlexBox className='gap-[2em]'>
        <Subtitle text="COME HERE TO STUDY" />
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <Subtitle text="LOGIN" />
        </Link>
        <Subtitle text="SIGN UP" />
      </FlexBox>
      <HorizontalLine />
    </>
  );
}

function App() {
  const { config } = useDopamineIntensity();
  const { backgroundAnimation, isInverted } = config;

  return (
    <div className={twMerge(
      "relative h-screen w-screen overflow-hidden transition-[filter] duration-700",
      isInverted && "invert"
    )}>
      <motion.div 
        className='hero-background'
        {...backgroundAnimation}
      >
        <Shadertoy fragmentShader="back.glsl" style={{ width: '100%', height: '100%' }} />
      </motion.div>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>

      <SettingsBar />
    </div>
  )
}

export default App
