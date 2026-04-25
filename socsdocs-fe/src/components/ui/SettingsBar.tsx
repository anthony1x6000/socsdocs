import Slider from "./DopamineSlider";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import { getDopamineConfig } from "../../assets/dopamineStyles";

import { useCurrentSong } from "../../utils/songContext";

import useDopamineStore from "../../store/useDopamineStore";

const baseStyle = "absolute bottom-0 w-full mix-blend-hard-light h-[2.5em]";

export function SettingsBar() {
    const level = useDopamineStore((state) => state.level);
    const { settingsBarStyle, settingsBarAnimation } = getDopamineConfig(level);
    const currentSong = useCurrentSong();

    return (
        <motion.div 
            key={level}
            initial={{ x: 0, y: 0, scale: 1, rotate: 0, skewX: 0, opacity: 1 }}
            className={twMerge(
                baseStyle,
                settingsBarStyle,
                "flex items-center px-4 gap-[4em]"
            )}
            {...settingsBarAnimation}
        >
            <Slider className="w-[35%]" />
            <div>Vibrancy Level: {level}</div>
            <div>Song: {currentSong || "None"}</div>
        </motion.div>
    )
}
