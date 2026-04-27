import { Routes, Route, Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import {PageTitle} from './components/ui/Title';

import './App.css';
import {SettingsBar} from './components/ui/SettingsBar';
import Subtitle from './components/ui/Subtitle';
import FlexBox from './components/ui/FlexBox';
import HorizontalLine from './components/ui/HorizontalLine';
import { useDopamineIntensity } from './store/useDopamineIntensity';
import { HeroBackground } from './components/ui/HeroBackground';
import LoginPage from './pages/LoginPage';
import { Moveable } from './components/ui/Moveables';
import { textAnimationMap, textColors, titleWeights } from './assets/config';

function HomePage() {
  return (
    <>
      <Moveable 
        as="div" 
        animationMap={textAnimationMap} 
        colorDict={textColors} 
        weightDict={titleWeights}
        intensityMod={0}
        intensityModHover={0}
        className='mt-[3em]'
      >
        <PageTitle />
      </Moveable>

      <FlexBox className='gap-[2em]'>
        <Moveable as="span" animationMap={textAnimationMap} colorDict={textColors} intensityMod={0} intensityModHover={0}>
          <Subtitle text="COME HERE TO STUDY" />
        </Moveable>
        
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <Moveable as="span" animationMap={textAnimationMap} colorDict={textColors} intensityMod={0} intensityModHover={-1}>
            <Subtitle text="LOGIN" />
          </Moveable>
        </Link>
      </FlexBox>
      <HorizontalLine />
    </>
  );
}

function App() {
  const { config } = useDopamineIntensity();
  const { isInverted } = config;

  return (
    <div className={twMerge(
      "relative h-screen w-screen overflow-hidden transition-[filter] duration-700",
      isInverted && "invert"
    )}>
      <HeroBackground />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>

      <Moveable className="fixed bottom-0 left-0 right-0">
        <SettingsBar />
      </Moveable>
    </div>
  )
}

export default App
