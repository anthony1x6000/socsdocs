import { useRef } from "react";
import useDopamineStore from "../../store/useDopamineStore";
import { twMerge } from "tailwind-merge";
import { Howl } from 'howler';
import { bongSound, bongFinish } from "../Sfx";
import { getDopamineConfig } from "../../assets/dopamineStyles";
import { motion } from "framer-motion";

const slideSound = new Howl({
    src: [bongSound],
    volume: 0.5,
});
const slideFinish = new Howl({
    src: [bongFinish],
    volume: 0.5,
});

interface SliderProps {
    className?: string;
}

const baseStyle = "transition-all w-full";

export function Slider({ className }: SliderProps) {
    const setLevel = useDopamineStore((state) => state.setLevel);
    const value = useDopamineStore((state) => state.level);
    const { sliderStyle, sliderAnimation } = getDopamineConfig(value);
    const lastPlayTime = useRef(0);

    return (
        <motion.input
            key={value}
            initial={{ x: 0, y: 0, scale: 1, rotate: 0, skewX: 0 }}
            className={twMerge(
                baseStyle,
                sliderStyle,
                className
            )}
            id="dopamine-slider"
            type="range"
            min={1}
            max={5}
            value={value}
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
