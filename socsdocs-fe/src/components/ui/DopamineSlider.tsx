import { useRef } from "react";
import useDopamineStore, { useDopamineStoreInstance } from "../../store/useDopamineStore";
import { setDopamineLevel } from "../../store/dopamineStore";
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
    /** Additional CSS classes for the slider input. */
    className?: string;
}

/**
 * An interactive range slider that controls the global dopamine level (1-5).
 * Features audio feedback on level changes (bong sounds).
 * 
 * @example
 * <Slider className="w-full" />
 */
export function Slider({ 
  className,
}: SliderProps) {
    const store = useDopamineStoreInstance();
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
                setDopamineLevel(store, newValue);
                
                const now = Date.now();
                if (now - lastPlayTime.current >= 500) {
                    lastPlayTime.current = now;
                    if (newValue != 5) {
                        slideSound.play();
                    } else {
                        slideFinish.play();
                    }
                }
            }}
        />
    );
}

export default Slider;
