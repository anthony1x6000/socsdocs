import Slider from "./DopamineSlider";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import { getDopamineConfig, BASE_SETTINGS_BAR_STYLE } from "../../assets/dopamineStyles";
import { Text } from "./Text";

import { useSong } from "../../utils/useSong";

import useDopamineStore from "../../store/useDopamineStore";

export function SettingsBar() {
    const level = useDopamineStore((state) => state.level);
    const { settingsBarStyle, settingsBarAnimation } = getDopamineConfig(level);
    const { currentSong } = useSong();

    return (
        <motion.div 
            key={level}
            initial={{ x: 0, y: 0, scale: 1, rotate: 0, skewX: 0, opacity: 1 }}
            className={twMerge(
                BASE_SETTINGS_BAR_STYLE,
                settingsBarStyle,
                "flex items-center px-4 gap-[4em]"
            )}
            {...settingsBarAnimation}
        >
            <Slider className="w-[35%]" />
            <Text>Vibrancy Level: {level}</Text>
            <Text>Song: {currentSong || "None"}</Text>
        </motion.div>
    )
}
