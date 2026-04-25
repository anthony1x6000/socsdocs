import type { MotionProps } from "framer-motion";

export type DopamineLevel = 1 | 2 | 3 | 4 | 5;

export interface DopamineConfig {
  titleStyle: string;
  headerStyle: string;
  titleAnimation: MotionProps;
  buttonStyle: string;
  buttonAnimation: MotionProps;
  sliderStyle: string;
  sliderAnimation: MotionProps;
  bodyFrameStyle: string;
  bodyFrameAnimation: MotionProps;
  settingsBarStyle: string;
  settingsBarAnimation: MotionProps;
  songs: string[];
}

// --- GLOBAL COLOR PALETTES (4 distinct colors per level) ---
export const LEVEL_1_COLORS = { text: "text-white-500", primary: "bg-blue-500", secondary: "bg-gray-100", accent: "accent-blue-500" };
export const LEVEL_2_COLORS = { text: "text-white-600", primary: "bg-blue-600", secondary: "bg-gray-200", accent: "accent-blue-600" };
export const LEVEL_3_COLORS = { text: "text-white-700", primary: "bg-blue-700", secondary: "bg-gray-300", accent: "accent-blue-700" };
export const LEVEL_4_COLORS = { text: "text-white-800", primary: "bg-blue-800", secondary: "bg-gray-400", accent: "accent-blue-800" };
export const LEVEL_5_COLORS = { text: "text-white-900", primary: "bg-red-600",  secondary: "bg-gray-500", accent: "accent-red-600" };

// --- GLOBAL ANIMATIONS ---
export const ANIM_NONE: MotionProps = {};
export const ANIM_FLOAT: MotionProps = {
  animate: { y: [-2, 2, -2] },
  transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
};
export const ANIM_PULSE: MotionProps = {
  animate: { opacity: [0.8, 1, 0.8] },
  transition: { repeat: Infinity, duration: 2 },
};
export const ANIM_SCALE_PULSE: MotionProps = {
  animate: { scale: [1, 1.02, 1] },
  transition: { repeat: Infinity, duration: 3 },
};
export const ANIM_JITTER_MILD: MotionProps = {
  animate: { x: [-1, 1, -1], y: [-1, 1, -1] },
  transition: { repeat: Infinity, duration: 0.2, ease: "linear" },
};
export const ANIM_JITTER_INTENSE: MotionProps = {
  animate: { x: [-2, 2, -3, 3, -2, 2], y: [-2, 2, -3, 3, -2, 2] },
  transition: { repeat: Infinity, duration: 0.1, ease: "linear" },
};
export const ANIM_SHAKE: MotionProps = {
  animate: { x: [-4, 4, -6, 6, -4, 4], y: [-4, 4, -6, 6, -4, 4] },
  transition: { repeat: Infinity, duration: 0.05, ease: "linear" },
};
export const ANIM_BOUNCE_MILD: MotionProps = {
  animate: { y: [0, -2, 0] },
  transition: { repeat: Infinity, duration: 2 },
};
export const ANIM_BOUNCE_INTENSE: MotionProps = {
  animate: { y: [0, -4, 0], opacity: [0.9, 1, 0.9] },
  transition: { repeat: Infinity, duration: 1 },
};
export const ANIM_SKEW: MotionProps = {
  animate: { y: [0, -6, 0], skewX: [-3, 3, -3], skewY: [-1, 1, -1] },
  transition: { repeat: Infinity, duration: 0.1 },
};
export const ANIM_BG_SHIFT: MotionProps = {
  animate: { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] },
  transition: { repeat: Infinity, duration: 5 }
};

export const hoverScale = (scale: number) => ({ whileHover: { scale }, whileTap: { scale: 1 - (scale - 1) } });

export const BASE_TITLE_STYLE = "transition-all";
export const BASE_HEADER_STYLE = "";
export const BASE_BUTTON_STYLE = "px-4 py-2 text-white font-semibold rounded hover:opacity-80";
export const BASE_SLIDER_STYLE = "transition-all w-full";
export const BASE_BODY_FRAME_STYLE = "transition-all duration-300";
export const BASE_SETTINGS_BAR_STYLE = "absolute bottom-0 w-full mix-blend-hard-light h-[2.5em]";

const titleSize = "text-5xl";
const titleStyles: Record<DopamineLevel, string> = {
  1: `${titleSize} font-normal ${LEVEL_1_COLORS.text}`,
  2: `${titleSize} font-medium ${LEVEL_2_COLORS.text}`,
  3: `${titleSize} font-medium ${LEVEL_3_COLORS.text}`,
  4: `${titleSize} font-semibold ${LEVEL_4_COLORS.text}`,
  5: `${titleSize} font-bold ${LEVEL_5_COLORS.text}`,
};

const headerSize = "text-3xl";
const headerStyles: Record<DopamineLevel, string> = {
  1: `${headerSize} font-normal ${LEVEL_1_COLORS.text}`,
  2: `${headerSize} font-medium ${LEVEL_2_COLORS.text}`,
  3: `${headerSize} font-medium ${LEVEL_3_COLORS.text}`,
  4: `${headerSize} font-semibold ${LEVEL_4_COLORS.text}`,
  5: `${headerSize} font-bold ${LEVEL_5_COLORS.text}`,
};

const titleAnimations: Record<DopamineLevel, MotionProps> = {
  1: ANIM_NONE,
  2: ANIM_FLOAT,
  3: ANIM_JITTER_MILD,
  4: ANIM_JITTER_INTENSE,
  5: ANIM_SHAKE,
};

const buttonStyles: Record<DopamineLevel, string> = {
  1: LEVEL_1_COLORS.primary,
  2: LEVEL_2_COLORS.primary,
  3: LEVEL_3_COLORS.primary,
  4: LEVEL_4_COLORS.primary,
  5: LEVEL_5_COLORS.primary,
};

const buttonAnimations: Record<DopamineLevel, MotionProps> = {
  1: ANIM_NONE,
  2: hoverScale(1.05),
  3: { ...hoverScale(1.1), ...ANIM_BOUNCE_MILD },
  4: { ...hoverScale(1.15), ...ANIM_BOUNCE_INTENSE },
  5: { ...hoverScale(1.2), ...ANIM_SKEW },
};

const sliderStyles: Record<DopamineLevel, string> = {
  1: LEVEL_1_COLORS.accent,
  2: LEVEL_2_COLORS.accent,
  3: LEVEL_3_COLORS.accent,
  4: LEVEL_4_COLORS.accent,
  5: LEVEL_5_COLORS.accent,
};

const sliderAnimations: Record<DopamineLevel, MotionProps> = {
  1: ANIM_NONE,
  2: ANIM_PULSE,
  3: ANIM_JITTER_MILD,
  4: ANIM_JITTER_INTENSE,
  5: ANIM_SHAKE,
};

const bodyFrameStyles: Record<DopamineLevel, string> = {
  1: `p-4 ${LEVEL_1_COLORS.secondary}`,
  2: `p-6 ${LEVEL_2_COLORS.secondary}`,
  3: `p-8 ${LEVEL_3_COLORS.secondary}`,
  4: `p-10 ${LEVEL_4_COLORS.secondary}`,
  5: `p-12 ${LEVEL_5_COLORS.secondary}`,
};

const bodyFrameAnimations: Record<DopamineLevel, MotionProps> = {
  1: ANIM_NONE,
  2: ANIM_NONE,
  3: ANIM_BG_SHIFT,
  4: ANIM_SCALE_PULSE,
  5: ANIM_SHAKE,
};

const settingsBarStyles: Record<DopamineLevel, string> = {
  1: LEVEL_1_COLORS.primary,
  2: LEVEL_2_COLORS.primary,
  3: LEVEL_3_COLORS.primary,
  4: LEVEL_4_COLORS.primary,
  5: LEVEL_5_COLORS.primary,
};

const settingsBarAnimations: Record<DopamineLevel, MotionProps> = {
  1: ANIM_NONE,
  2: ANIM_NONE,
  3: ANIM_BOUNCE_MILD,
  4: ANIM_BOUNCE_INTENSE,
  5: ANIM_SKEW,
};

const songs: Record<DopamineLevel, string[]> = {
  1: [
    "macroblank01/macroblank1.mp3",
    "macroblank01/macroblank2.mp3",
    "macroblank01/macroblank3.mp3",
    "macroblank01/macroblank4.mp3",
    "macroblank01/macroblank5.mp3",
    "macroblank01/macroblank6.mp3",
  ],
  2: [
    "macroblank01/macroblank7.mp3",
    "macroblank01/macroblank8.mp3",
    "macroblank01/macroblank9.mp3",
    "macroblank01/macroblank10.mp3",
    "macroblank01/macroblank11.mp3",
  ],
  3: ["orion-cpp/distantrooms.mp3"],
  4: [
    "sewerslvt/21_Lolibox.mp3",
    "sewerslvt/22_SewerslvtWas_It_Weird_I_Listened_To_Im_God_By_Clams_Casino's_When_I_Lost_My_Virginity_(reupload).mp3",
    "sewerslvt/23_Sewerslvtsick,_twisted,_demented.mp3",
    "sewerslvt/24_SewerslvtMAKE_ME_SAD.mp3",
    "sewerslvt/25_Sewerslvtblissful_overdose.mp3",
    "sewerslvt/26_SewerslvtYandere_Complex.mp3",
    "sewerslvt/27_SewerslvtDown_The_Drain_(feat._Nurtheon).mp3",
    "sewerslvt/28_Sewerslvtthe_last_thing_she_sent_me.mp3",
    "sewerslvt/29_SewerslvtI_Really_Like_You_pt2.mp3",
    "sewerslvt/30_SewerslvtLooming.Sorrow.Descent.mp3",
    "sewerslvt/01_SewerslvtPretty_Cvnt.mp3",
    "sewerslvt/02_SewerslvtMr._Kill_Myself.mp3",
    "sewerslvt/03_SewerslvtNewlove.mp3",
    "sewerslvt/04_Sewerslvtinpeace.mp3",
    "sewerslvt/05_SewerslvtCyberia_lyr1.mp3",
  ],
  5: [
    "sewerslvt/06_SewerslvtLexapro_Delirium.mp3",
    "sewerslvt/07_AZALEA卒業ですね_(Sewerslvt_Remix).mp3",
    "sewerslvt/08_Bring_Me_The_HorizonDrown_(Sewerslvt_Remix).mp3",
    "sewerslvt/09_Sewerslvtgoodbye.mp3",
    "sewerslvt/10_LOONAHi_High_(Sewerslvt_Remix).mp3",
    "sewerslvt/11_SewerslvtEcifircas.mp3",
    "sewerslvt/12_SewerslvtThe_Grilled_Fish's_Ballad.mp3",
    "sewerslvt/13_SewerslvtSlowdeath.mp3",
    "sewerslvt/14_Sewerslvtinlove.mp3",
    "sewerslvt/15_SewerslvtJvnko_Loves_You.mp3",
    "sewerslvt/16_Sewerslvtwhatever.mp3",
    "sewerslvt/17_SewerslvtHopelessness.mp3",
    "sewerslvt/18_Sewerslvtself_destruction_worldwide_broadcast.mp3",
    "sewerslvt/19_Porter_RobinsonGet_Your_Wish_(Sewerslvt_Remix).mp3",
    "sewerslvt/20_Sewerslvtall_the_joy_In_life_was_gone_once_you_left.mp3",
  ],
};

export const levelSongs = songs;

export const getDopamineConfig = (level: number): DopamineConfig => {
  const l = Math.min(Math.max(Math.floor(level), 1), 5) as DopamineLevel;
  return {
    titleStyle: titleStyles[l],
    headerStyle: headerStyles[l],
    titleAnimation: titleAnimations[l],
    buttonStyle: buttonStyles[l],
    buttonAnimation: buttonAnimations[l],
    sliderStyle: sliderStyles[l],
    sliderAnimation: sliderAnimations[l],
    bodyFrameStyle: bodyFrameStyles[l],
    bodyFrameAnimation: bodyFrameAnimations[l],
    settingsBarStyle: settingsBarStyles[l],
    settingsBarAnimation: settingsBarAnimations[l],
    songs: songs[l],
  };
};
