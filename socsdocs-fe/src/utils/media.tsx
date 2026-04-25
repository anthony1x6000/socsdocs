/**
 * 
 * @param filename
 * @returns string, working URL
 * @description Accepts a single filename argument as a string, then `: string` to ensure will always return a string
 */
const getMediaUrl = (filename: string, baseUrl: string): string => {
  const cleanBaseUrl = baseUrl.replace(/\/$/, "");
  const cleanFilename = filename.replace(/^\//, "");
  return `${cleanBaseUrl}/${cleanFilename}`;
};

/**
 * 
 * @param filename 
 * @returns string, working URL for Audio
 */
export const getAudioUrl = (filename: string): string => {
  const url = getMediaUrl(filename, import.meta.env.VITE_AUDIO_BASE_URL || "");
  console.log(url);
  return url;
};

/**
 * @param filename
 * @returns string, working URL for SFX
 */
export const getSFXUrl = (filename: string): string =>
  getMediaUrl(filename, import.meta.env.VITE_SFX_BASE_URL || "");

/**
 * @param filename
 * @returns string, working URL for Music
 */
export const getMusicUrl = (filename: string): string =>
  getMediaUrl(filename, import.meta.env.VITE_MUSIC_BASE_URL || "");