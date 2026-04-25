import type { MotionProps } from "framer-motion";

export type DopamineLevel = 1 | 2 | 3 | 4 | 5;

export interface DopamineConfig {
  titleStyle: string;
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

const titleStyles: Record<DopamineLevel, string> = {
  1: "text-lg font-normal text-white-500",
  2: "text-xl font-medium text-white-600",
  3: "text-2xl font-medium text-white-700",
  4: "text-3xl font-semibold text-white-800",
  5: "text-4xl font-bold text-white-900",
};

const titleAnimations: Record<DopamineLevel, MotionProps> = {
  1: {},
  2: {
    animate: { y: [-2, 2, -2] },
    transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
  },
  3: {
    animate: { x: [-1, 1, -1], y: [-1, 1, -1] },
    transition: { repeat: Infinity, duration: 0.2, ease: "linear" },
  },
  4: {
    animate: { x: [-2, 2, -3, 3, -2, 2], y: [-2, 2, -3, 3, -2, 2] },
    transition: { repeat: Infinity, duration: 0.1, ease: "linear" },
  },
  5: {
    animate: { x: [-4, 4, -6, 6, -4, 4], y: [-4, 4, -6, 6, -4, 4] },
    transition: { repeat: Infinity, duration: 0.05, ease: "linear" },
  },
};

const buttonStyles: Record<DopamineLevel, string> = {
  1: "bg-blue-500",
  2: "bg-blue-600",
  3: "bg-blue-700",
  4: "bg-blue-800",
  5: "bg-blue-900",
};

const hoverScale = (scale: number) => ({ whileHover: { scale }, whileTap: { scale: 1 - (scale - 1) } });

const buttonAnimations: Record<DopamineLevel, MotionProps> = {
  1: {},
  2: hoverScale(1.05),
  3: {
    ...hoverScale(1.1),
    animate: { x: [-0.5, 0.5, -0.5] },
    transition: { repeat: Infinity, duration: 0.3 },
  },
  4: {
    ...hoverScale(1.15),
    animate: { x: [-1, 1, -1], skewX: [-1, 1, -1] },
    transition: { repeat: Infinity, duration: 0.15 },
  },
  5: {
    ...hoverScale(1.2),
    animate: { x: [-2, 2, -2], skewX: [-3, 3, -3] },
    transition: { repeat: Infinity, duration: 0.08 },
  },
};

const sliderStyles: Record<DopamineLevel, string> = {
  1: "accent-blue-500",
  2: "accent-blue-600",
  3: "accent-blue-700",
  4: "accent-blue-800",
  5: "accent-red-500",
};

const jitter = (intensity: number, duration: number): MotionProps => ({
  animate: { x: [-intensity, intensity, -intensity] },
  transition: { repeat: Infinity, duration },
});

const sliderAnimations: Record<DopamineLevel, MotionProps> = {
  1: {},
  2: { animate: { opacity: [0.8, 1, 0.8] }, transition: { repeat: Infinity, duration: 2 } },
  3: jitter(1, 0.4),
  4: jitter(2, 0.2),
  5: {
    animate: { x: [-3, 3, -3], rotate: [-1, 1, -1] },
    transition: { repeat: Infinity, duration: 0.1 },
  },
};

const bodyFrameStyles: Record<DopamineLevel, string> = {
  1: "p-4 bg-gray-100",
  2: "p-6 bg-gray-200",
  3: "p-8 bg-gray-300",
  4: "p-10 bg-gray-400",
  5: "p-12 bg-gray-500",
};

const bodyFrameAnimations: Record<DopamineLevel, MotionProps> = {
  1: {},
  2: {},
  3: { animate: { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }, transition: { repeat: Infinity, duration: 5 } },
  4: { animate: { scale: [1, 1.01, 1] }, transition: { repeat: Infinity, duration: 3 } },
  5: { animate: { scale: [1, 1.02, 1], rotate: [-0.1, 0.1, -0.1] }, transition: { repeat: Infinity, duration: 1 } },
};

const settingsBarStyles: Record<DopamineLevel, string> = {
  1: "bg-blue-500",
  2: "bg-blue-600",
  3: "bg-blue-700",
  4: "bg-blue-800",
  5: "bg-red-600",
};

const barBounce = (y: number, duration: number): MotionProps => ({
  animate: { y: [0, -y, 0] },
  transition: { repeat: Infinity, duration },
});

const settingsBarAnimations: Record<DopamineLevel, MotionProps> = {
  1: {},
  2: {},
  3: barBounce(2, 2),
  4: { ...barBounce(4, 1), animate: { ...barBounce(4, 1).animate as any, opacity: [0.9, 1, 0.9] } },
  5: { animate: { y: [0, -6, 0], skewY: [-1, 1, -1] }, transition: { repeat: Infinity, duration: 0.5 } },
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
