import Slider from "./DopamineSlider";
import { twMerge } from "tailwind-merge";
import { BASE_SETTINGS_BAR_STYLE } from "../../assets/config/baseStyles";
import { Typography } from "./Typography";
import { useSong } from "../../utils/useSong";
import useDopamineStore from "../../store/useDopamineStore";

/**
 * Bottom settings bar. Stateless regarding animations.
 * Responsibility for movement is delegated to Moveable wrapper in parent.
 */
export function SettingsBar() {
    const globalLevel = useDopamineStore((state) => state.level);
    const { currentSong } = useSong();

    return (
        <div 
            className={twMerge(
                BASE_SETTINGS_BAR_STYLE,
                "flex items-center px-4 gap-[4em] h-[4em]"
            )}
        >
            <Slider className="w-[10em]" />
            <Typography variant="text">Vibrancy Level: {globalLevel}</Typography>
            <Typography variant="text">Song: {currentSong || "None"}</Typography>
        </div>
    )
}

export default SettingsBar;
