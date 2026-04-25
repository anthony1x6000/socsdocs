import Slider from "./DopamineSlider";
import { twMerge } from "tailwind-merge";

import useDopamineStore from "../../store/useDopamineStore";

const baseStyle = "absolute bottom-0 w-full bg-blue-500 mix-blend-hard-light h-[5%]";

export function SettingsBar() {
    const level = useDopamineStore((state) => state.level);

    return (
        <>
            <div className={twMerge(
                baseStyle,
                "flex items-center px-4 gap-[4em]"
            )}>
                <Slider className="w-[35%]" />
                Vibrancy Level: {level}
            </div>
            
        </>
    )
}