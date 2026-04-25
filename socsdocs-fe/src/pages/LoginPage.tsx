import { Shadertoy } from 'react-shadertoy';
import { motion } from 'framer-motion';
import { PageTitle } from '../components/ui/Title';
import FlexBox from '../components/ui/FlexBox';
import Subtitle from '../components/ui/Subtitle';
import { Link } from 'react-router-dom';
import { BackgroundMusic } from '../components/BackgroundMusic';
import { useDopamineIntensity } from '../store/useDopamineIntensity';

export default function LoginPage() {
  const { config } = useDopamineIntensity();
  const { backgroundAnimation } = config;

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <BackgroundMusic />
      <motion.div 
        className='hero-background'
        {...backgroundAnimation}
      >
        <Shadertoy fragmentShader="back.glsl" style={{ width: '100%', height: '100%' }} />
      </motion.div>
...
      <PageTitle className='mt-[3em]' />
      
      <FlexBox className='mt-[2em] flex-col items-center gap-[1em]'>
        <Subtitle text="LOGIN PAGE" />
        <Link to="/" className="text-white underline mt-4">Go Back</Link>
      </FlexBox>
    </div>
  );
}
