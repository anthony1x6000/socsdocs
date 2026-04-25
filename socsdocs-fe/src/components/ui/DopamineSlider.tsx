import useDopamineStore from "../../store/useDopamineStore";
import { twMerge } from "tailwind-merge";
import { Howl } from 'howler';
import { bongSound, bongFinish } from "../Sfx";
import { getDopamineConfig } from "./dopamineLevelStyles";

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
    const { sliderStyle } = getDopamineConfig(value);

    return (
        <input
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
                if (newValue != 5) {
                    slideSound.play();
                } else {
                    slideFinish.play();
                }
                setLevel(newValue);
            }}
        />
    );
}

export default Slider;
