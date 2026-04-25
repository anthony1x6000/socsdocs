import useDopamineStore from "../../store/useDopamineStore";
import { twMerge } from "tailwind-merge";
import { Howl } from 'howler';
import { bongSound, bongFinish } from "../Sfx";
import { sliderStyle } from "./dopamineLevelStyles";

const slideSound = new Howl({
    src: [bongSound],
    volume: 0.5,
});
const slideFinish = new Howl({
    src: [bongFinish],
    volume: 0.5,
});

export function Slider() {
    const setLevel = useDopamineStore((state) => state.setLevel);
    const value = useDopamineStore((state) => state.level);

    return (
        <input
            className={twMerge(
                "transition-all",
                sliderStyle[value]
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
