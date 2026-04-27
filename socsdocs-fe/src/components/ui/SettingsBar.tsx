import Slider from "./DopamineSlider";
import { twMerge } from "tailwind-merge";
import { BASE_SETTINGS_BAR_STYLE } from "../../assets/config/baseStyles";
import { Typography } from "./Typography";
import { useSong } from "../../utils/useSong";
import useDopamineStore from "../../store/useDopamineStore";

/**
 * A floating bar positioned at the bottom of the viewport that displays global application settings.
 * Includes a slider to control dopamine levels and readouts for the current vibrancy level and active song.
 * 
 * @example
 * // Usually wrapped in a Moveable for jitter effects
 * <Moveable className="fixed bottom-0 left-0 right-0">
 *   <SettingsBar />
 * </Moveable>
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
