import { Routes, Route, Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import Typography from './components/ui/Typography';

import './App.css';
import {SettingsBar} from './components/ui/SettingsBar';
import { useDopamineIntensity } from './store/useDopamineIntensity';
import { HeroBackground } from './components/ui/HeroBackground';
import LoginPage from './pages/LoginPage';
import AccountPage from './pages/AccountPage';
import { Moveable } from './components/ui/Moveables';
import { textAnimationMap, textColors, titleWeights } from './assets/config';
import { useSession } from './lib/auth-client';

function HomePage() {
  const { data: session } = useSession();

  return (
    <>
      <Moveable 
        as="div" 
        animationMap={textAnimationMap} 
        colorDict={textColors} 
        weightDict={titleWeights}
        className='mt-[3em]'
      >
        <Typography variant="title">SOCSDOCS</Typography>
      </Moveable>

      <div className='flex gap-[2em]'>
        <Moveable as="span" animationMap={textAnimationMap} colorDict={textColors}>
          <Typography variant="subtitle">COME HERE TO STUDY</Typography>
        </Moveable>
        
        {!session?.user ? (
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Moveable as="span" animationMap={textAnimationMap} colorDict={textColors} intensityModHover={-5}>
              <Typography variant="subtitle">LOGIN</Typography>
            </Moveable>
          </Link>
        ) : (
          <Link to="/account" style={{ textDecoration: 'none' }}>
            <Moveable as="span" animationMap={textAnimationMap} colorDict={textColors} intensityModHover={-5}>
              <Typography variant="subtitle">ACCOUNT</Typography>
            </Moveable>
          </Link>
        )}

        {session?.user && (
          <Moveable as="span" animationMap={textAnimationMap} colorDict={textColors}>
            <Typography variant="subtitle">
              {session.user.name} (ID: {session.user.id})
            </Typography>
          </Moveable>
        )}
      </div>
      <div className="w-full h-2px bg-white block" />
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
        <Route path="/account" element={<AccountPage />} />
      </Routes>

      <div className="fixed bottom-0 left-0 right-0">
        <SettingsBar />
      </div>
    </div>
  )
}

export default App
