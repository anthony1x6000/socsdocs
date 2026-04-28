import type { BackgroundConfig } from "../types";

/**
 * Configuration for the hero background per dopamine level.
 * Defines the shader, overlay image, and blend mode.
 */
export const backgroundConfigs: Record<number, BackgroundConfig> = {
  1: {
    fragmentShader: "back.glsl",
    overlayUrl: "https://unsplash.com/photos/ClWvcrkBhMY/download?force=true&w=1920",
    mixBlendMode: "color-burn",
    extraStyle: "bg-cover",
  },
  2: {
    fragmentShader: "back.glsl",
    overlayUrl: "https://unsplash.com/photos/ClWvcrkBhMY/download?force=true&w=1920",
    mixBlendMode: "color-burn",
  },
  3: {
    fragmentShader: "back.glsl",
    overlayUrl: "https://unsplash.com/photos/ClWvcrkBhMY/download?force=true&w=1920",
    mixBlendMode: "color-burn",
  },
  4: {
    fragmentShader: "back.glsl",
    overlayUrl: "https://unsplash.com/photos/ClWvcrkBhMY/download?force=true&w=1920",
    mixBlendMode: "color-burn",
    extraStyle: "opacity-100",
  },
  5: {
    fragmentShader: "back.glsl",
    overlayUrl: "https://unsplash.com/photos/ClWvcrkBhMY/download?force=true&w=1920",
    mixBlendMode: "color-burn",
    extraStyle: "opacity-0",
  },
};
