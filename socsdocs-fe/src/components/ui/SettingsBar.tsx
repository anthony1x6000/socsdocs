import Slider from "./DopamineSlider";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import { BASE_SETTINGS_BAR_STYLE } from "../../assets/dopamineStyles";
import { Text } from "./Text";
import { useSong } from "../../utils/useSong";
import useDopamineStore from "../../store/useDopamineStore";
import { useDopamineIntensity } from "../../store/useDopamineIntensity";

/**
 * Props for the SettingsBar component.
 * @interface SettingsBarProps
 * @property {number} [intensity=1] - Multiplier for the global dopamine level.
 * @property {number} [intensityOnHover] - Absolute override for the dopamine level when hovered (1-5).
 */
interface SettingsBarProps {
  intensity?: number;
  intensityOnHover?: number;
}

/**
 * Bottom settings bar that displays the current vibrancy level and active song.
 * Contains the DopamineSlider for global level control.
 * The intensity prop acts as a multiplier for the global dopamine level.
 * 
 * @param {SettingsBarProps} props - Component props.
 * @returns {JSX.Element} A motion.div containing settings controls.
 * 
 * @example
 * <SettingsBar intensity={2} />
 */
export function SettingsBar({ intensity = 1, intensityOnHover }: SettingsBarProps) {
    const globalLevel = useDopamineStore((state) => state.level);
    const { intensity: currentIntensity, config, handleMouseEnter, handleMouseLeave } = useDopamineIntensity(intensity, intensityOnHover);
    const { settingsBarStyle, settingsBarAnimation } = config;
    const { currentSong } = useSong();

    return (
        <motion.div 
            key={currentIntensity}
            initial={{ x: 0, y: 0, scale: 1, rotate: 0, skewX: 0, opacity: 1 }}
            className={twMerge(
                BASE_SETTINGS_BAR_STYLE,
                settingsBarStyle,
                "flex items-center px-4 gap-[4em] h-[4em]"
            )}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...settingsBarAnimation}
        >
            <Slider className="w-[10em]" />
            <Text intensity={currentIntensity}>Vibrancy Level: {globalLevel}</Text>
            <Text intensity={currentIntensity}>Song: {currentSong || "None"}</Text>
        </motion.div>
    )
}

export default SettingsBar;
