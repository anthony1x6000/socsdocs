import { useRef } from "react";
import useDopamineStore from "../../store/useDopamineStore";
import { twMerge } from "tailwind-merge";
import { Howl } from 'howler';
import { bongSound, bongFinish } from "../Sfx";
import { BASE_SLIDER_STYLE } from "../../assets/config/baseStyles";
import { ElementMoveable } from "./Moveables";
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
 */
interface SliderProps {
    className?: string;
    intensity?: number;
    intensityOnHover?: number;
}

/**
 * Interactive slider wrapped in ElementMoveable.
 */
export function Slider({ 
  className,
  intensity = 1,
  intensityOnHover
}: SliderProps) {
    const setLevel = useDopamineStore((state) => state.setLevel);
    const globalValue = useDopamineStore((state) => state.level);
    const { intensity: currentIntensity, handleMouseEnter, handleMouseLeave } = useDopamineIntensity(intensity, intensityOnHover);
    const lastPlayTime = useRef(0);

    return (
        <ElementMoveable
            intensity={currentIntensity}
            type="slider"
            className={twMerge(BASE_SLIDER_STYLE, className)}
        >
            <input
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                id="dopamine-slider"
                type="range"
                min={1}
                max={5}
                value={globalValue}
                className="w-full h-full bg-transparent appearance-none cursor-pointer"
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
            />
        </ElementMoveable>
    );
}

export default Slider;
