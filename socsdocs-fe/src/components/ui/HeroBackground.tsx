import { Shadertoy } from 'react-shadertoy';
import { motion } from 'framer-motion';
import { useDopamineIntensity } from '../../store/useDopamineIntensity';
import { useResetMotion } from '../../utils/useResetMotion';

/**
 * Animated background component that integrates a Shadertoy fragment shader with dopamine-driven Framer Motion animations.
 * Responds to the current dopamine intensity for motion effects.
 * 
 * @example
 * // Typically used as a fixed background in the main App layout
 * <div className="app-container">
 *   <HeroBackground />
 *   <main>...</main>
 * </div>
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
