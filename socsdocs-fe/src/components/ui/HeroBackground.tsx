import { Shadertoy } from 'react-shadertoy';
import { motion } from 'framer-motion';
import { useDopamineIntensity } from '../../store/useDopamineIntensity';
import { useResetMotion } from '../../utils/useResetMotion';

/**
 * Animated background component using Shadertoy and dopamine-driven motion.
 */
export function HeroBackground() {
  const { intensity, config } = useDopamineIntensity();
  const { backgroundAnimation } = config;

  const bgMotionProps = useResetMotion("bg", intensity, backgroundAnimation);

  return (
    <motion.div 
      className='hero-background'
      {...bgMotionProps}
    >
      <Shadertoy fragmentShader="back.glsl" style={{ width: '100%', height: '100%' }} />
    </motion.div>
  );
}

export default HeroBackground;
