import { useRef } from "react";
import useDopamineStore from "../../store/useDopamineStore";
import { twMerge } from "tailwind-merge";
import { Howl } from 'howler';
import { bongSound, bongFinish } from "../Sfx";
import { BASE_SLIDER_STYLE } from "../../assets/dopamineStyles";
import { motion } from "framer-motion";
import { useDopamineIntensity } from "../../store/useDopamineIntensity";

const slideSound = new Howl({
    src: [bongSound],
    volume: 0.5,
});
const slideFinish = new Howl({
    src: [bongFinish],
    volume: 0.5,
});

/**
 * Props for the Slider component.
 * @interface SliderProps
 * @property {string} [className] - Optional additional CSS classes.
 * @property {number} [intensity=1] - Multiplier for the global dopamine level.
 * @property {number} [intensityOnHover] - Absolute override for the dopamine level when hovered (1-5).
 */
interface SliderProps {
    className?: string;
    intensity?: number;
    intensityOnHover?: number;
}

/**
 * Interactive slider to control the global dopamine level.
 * Features audio feedback and dopamine-driven animations.
 * The intensity prop acts as a multiplier for its own visual feedback level.
 * 
 * @param {SliderProps} props - Component props.
 * @returns {JSX.Element} A motion.input of type range.
 * 
 * @example
 * <Slider className="my-custom-slider" intensity={2} />
 */
export function Slider({ 
  className,
  intensity = 1,
  intensityOnHover
}: SliderProps) {
    const setLevel = useDopamineStore((state) => state.setLevel);
    const globalValue = useDopamineStore((state) => state.level);
    const { intensity: currentIntensity, config, handleMouseEnter, handleMouseLeave } = useDopamineIntensity(intensity, intensityOnHover);
    const { sliderStyle, sliderAnimation } = config;
    const lastPlayTime = useRef(0);

    return (
        <motion.input
            key={currentIntensity}
            initial={{ x: 0, y: 0, scale: 1, rotate: 0, skewX: 0 }}
            className={twMerge(
                BASE_SLIDER_STYLE,
                sliderStyle,
                className
            )}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            id="dopamine-slider"
            type="range"
            min={1}
            max={5}
            value={globalValue}
            onChange={(e) => {
                const newValue = Number(e.target.value);
                const now = Date.now();
                if (now - lastPlayTime.current >= 500) {
                    lastPlayTime.current = now;
                    if (newValue != 5) {
                        slideSound.play();
                    } else {
                        slideFinish.play();
                    }
                    setLevel(newValue);
                }
            }}
            {...sliderAnimation}
        />
    );
}

export default Slider;
