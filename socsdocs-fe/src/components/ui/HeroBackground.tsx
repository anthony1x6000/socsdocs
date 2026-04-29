import { Shadertoy } from 'react-shadertoy';
import { motion } from 'framer-motion';
import { useDopamineIntensity } from '../../store/useDopamineIntensity';
import { useResetMotion } from '../../utils/useResetMotion';
import { twMerge } from 'tailwind-merge';

/**
 * Animated background component that integrates a Shadertoy fragment shader with dopamine-driven Framer Motion animations.
 * Responds to the current dopamine intensity for motion effects and visual styles.
 * 
 * Uses a persistent container for the shader to prevent iTime resets when dopamine levels change,
 * while still applying synchronized motion animations.
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
  const { backgroundAnimation, background } = config;
  const { fragmentShader, overlayUrl, mixBlendMode, extraStyle } = background;

  // We use useResetMotion to get the animation values, but we intentionally 
  // separate the key to prevent the container from remounting. 
  // Remounting would cause the Shadertoy component to reset its internal time (iTime).
  const motionProps = useResetMotion("bg", intensity, backgroundAnimation);

  return (
    <motion.div 
      className='hero-background absolute inset-0 overflow-hidden'
      {...motionProps}
      // Stable key ensures the component (and its shader child) is preserved across intensity changes.
      // This prevents the "snap back" effect on the shader's position/time.
      key="persistent-hero-bg"
    >
      <Shadertoy 
        fragmentShader={fragmentShader} 
        style={{ width: '100%', height: '100%' }} 
      />
      
      <div 
        className={
          twMerge(
            "absolute inset-0 w-full h-full pointer-events-none transition-all duration-100",
            extraStyle,
          )}
        style={{ 
          backgroundImage: `url('${overlayUrl}')`,
          mixBlendMode: mixBlendMode
        }} 
      />
    </motion.div>
  );
}

export default HeroBackground;
