import Slider from "./DopamineSlider";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import { getDopamineConfig } from "../../assets/dopamineStyles";

import { useCurrentSong } from "../BackgroundMusic";

import useDopamineStore from "../../store/useDopamineStore";

const baseStyle = "absolute bottom-0 w-full mix-blend-hard-light h-[2.5em]";

export function SettingsBar({ level: propLevel }: { level?: number }) {
    const storeLevel = useDopamineStore((state) => state.level);
    const level = propLevel ?? storeLevel;
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
