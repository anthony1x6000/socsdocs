import { useRef } from "react";
import useDopamineStore from "../../store/useDopamineStore";
import { twMerge } from "tailwind-merge";
import { Howl } from 'howler';
import { bongSound, bongFinish } from "../Sfx";
import { BASE_SLIDER_STYLE } from "../../assets/config/baseStyles";

const slideSound = new Howl({
    src: [bongSound],
    volume: 1,
});
const slideFinish = new Howl({
    src: [bongFinish],
    volume: 2,
});

/**
 * Props for the Slider component.
 */
interface SliderProps {
    className?: string;
}

/**
 * Interactive slider. Stateless regarding animations.
 * Responsibility for movement is delegated to Moveable wrapper in parent.
 */
export function Slider({ 
  className,
}: SliderProps) {
    const setLevel = useDopamineStore((state) => state.setLevel);
    const globalValue = useDopamineStore((state) => state.level);
    const lastPlayTime = useRef(0);

    return (
        <input
            id="dopamine-slider"
            type="range"
            min={1}
            max={5}
            value={globalValue}
            className={twMerge(BASE_SLIDER_STYLE, "bg-transparent appearance-none cursor-pointer", className)}
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
    );
}

export default Slider;
