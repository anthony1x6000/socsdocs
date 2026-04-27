import type { BackgroundConfig } from "../types";

/**
 * Configuration for the hero background per dopamine level.
 * Defines the shader, overlay image, and blend mode.
 */
export const backgroundConfigs: Record<number, BackgroundConfig> = {
  1: {
    fragmentShader: "back.glsl",
    overlayUrl: "https://unsplash.com/photos/YFb2dmUQ0Qo/download?force=true&w=1920",
    mixBlendMode: "color-burn",
  },
  2: {
    fragmentShader: "back.glsl",
    overlayUrl: "https://unsplash.com/photos/YFb2dmUQ0Qo/download?force=true&w=1920",
    mixBlendMode: "color-burn",
  },
  3: {
    fragmentShader: "back.glsl",
    overlayUrl: "https://unsplash.com/photos/YFb2dmUQ0Qo/download?force=true&w=1920",
    mixBlendMode: "color-dodge",
  },
  4: {
    fragmentShader: "back.glsl",
    overlayUrl: "https://unsplash.com/photos/YFb2dmUQ0Qo/download?force=true&w=1920",
    mixBlendMode: "overlay",
  },
  5: {
    fragmentShader: "back.glsl",
    overlayUrl: "",
    mixBlendMode: "difference",
  },
};
