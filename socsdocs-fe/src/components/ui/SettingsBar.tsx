import Slider from "./DopamineSlider";
import { twMerge } from "tailwind-merge";
import { BASE_SETTINGS_BAR_STYLE } from "../../assets/config/baseStyles";
import { primaryColors } from "../../assets/config";
import { Text } from "./Text";
import { ElementMoveable } from "./Moveables";
import { useSong } from "../../utils/useSong";
import useDopamineStore from "../../store/useDopamineStore";
import { useDopamineIntensity } from "../../store/useDopamineIntensity";

/**
 * Props for the SettingsBar component.
 */
interface SettingsBarProps {
  intensity?: number;
  intensityOnHover?: number;
}

/**
 * Bottom settings bar wrapped in ElementMoveable.
 */
export function SettingsBar({ intensity = 1, intensityOnHover }: SettingsBarProps) {
    const globalLevel = useDopamineStore((state) => state.level);
    const { intensity: currentIntensity, handleMouseEnter, handleMouseLeave } = useDopamineIntensity(intensity, intensityOnHover);
    const level = Math.min(Math.max(Math.floor(currentIntensity), 1), 5);
    const { currentSong } = useSong();

    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <ElementMoveable 
                intensity={currentIntensity}
                type="settingsBar"
                className={twMerge(
                    BASE_SETTINGS_BAR_STYLE,
                    primaryColors[level],
                    "flex items-center px-4 gap-[4em] h-[4em]"
                )}
            >
                <Slider className="w-[10em]" />
                <Text intensity={currentIntensity}>Vibrancy Level: {globalLevel}</Text>
                <Text intensity={currentIntensity}>Song: {currentSong || "None"}</Text>
            </ElementMoveable>
        </div>
    )
}

export default SettingsBar;
