import { useEffect, useRef } from 'react';
import useDopamineStore from '../store/useDopamineStore';
import { Howl } from 'howler';
import { getMusicUrl } from '../utils/media';
import { levelSongs, type DopamineLevel } from '../assets/dopamineStyles';
import { useSong } from '../utils/useSong';

const FADE_DURATION = 950;
const INITIAL_FADE_DURATION = 450;
const TARGET_VOLUME = 0.35;

/**
 * Type guard to check if a number is a valid DopamineLevel (1-5).
 * 
 * level is DopamineLevel is a Type Predicate, means to treat level as DopamineLevel when true
 * @param {number} level - The level to check.
 * @returns {boolean} True if the level is between 1 and 5 inclusive.
 */
function isDopamineLevel(level: number): level is DopamineLevel {
    return level >= 1 && level <= 5;
}

/**
 * Selects a random song name from the predefined list corresponding to the given dopamine level.
 * If no songs are found for the specific level, it attempts to find one in adjacent levels.
 * 
 * @param {number} level - The current dopamine level (typically 1-5).
 * @returns {string | null} The name of the selected song, or null if no songs are available.
 */
function getRandomSong(level: number): string | null {
    const l = Math.min(Math.max(Math.floor(level), 1), 5);
    const fallbackLevels = [l, Math.max(1, l - 1), Math.min(5, l + 1)];

    for (const currentLevel of fallbackLevels) {
        if (isDopamineLevel(currentLevel)) {
            const songs = levelSongs[currentLevel];
            if (songs && songs.length > 0) {
                const randomIndex = Math.floor(Math.random() * songs.length);
                return songs[randomIndex];
            }
        }
    }

    console.error(`No songs found for level ${l} or its adjacent levels.`);
    return null;
}

/**
 * Smoothly fades out a song and unloads it from memory after the fade completes.
 * 
 * @param {Howl} song - The Howl instance to fade out.
 * @param {number} duration - The duration of the fade in milliseconds.
 */
function fadeOutAndStop(song: Howl, duration = FADE_DURATION): Promise<void> {
    return new Promise((resolve) => {
        const vol = song.volume();
        const currentVol = typeof vol === 'number' ? vol : TARGET_VOLUME;
        song.fade(currentVol, 0, duration);
        setTimeout(() => {
            song.stop();
            song.unload();
            resolve();
        }, duration);
    });
}

/**
 * BackgroundMusic component that manages the audio playback and transitions
 * based on the current dopamine level from the store.
 */
export function BackgroundMusic() {
    const level = useDopamineStore((state) => state.level);
    /**
     * useRef to store a mutable value. This stores the current song playing, without triggering a rerender. \
     * <Howl | null> is a TS definition, either holds a Howl or null object. \
     * (null) defaults to null 
     */
    const currentSong = useRef<Howl | null>(null);
    const { currentSong: activeSong, setCurrentSong } = useSong();

    if (import.meta.env.VITE_DISABLE_MUSIC === 'true') {
        return null;
    }

    function playMusic(src: string): Howl {
        const sound = new Howl({ src: [src], loop: true, volume: 0 });
        sound.play();
        sound.fade(0, TARGET_VOLUME, INITIAL_FADE_DURATION);
        return sound;
    }

    /**
     * Smoothly crossfades between the currently playing song and a new song.
     * 
     * It creates a new Howl instance and waits for it to actually begin playing
     * before starting the fade animations. This prevents awkward gaps of silence
     * if the new track takes a moment to buffer or load. Once the transition is
     * complete, the old song is stopped and unloaded from memory.
     * 
     * @param {Howl} oldSong - The current Howl audio object to fade out.
     * @param {string} newSongSrc - The URL string of the new audio track to fade in.
     */
    function transitionSong(oldSong: Howl, newSongSrc: string) {
        const newSong = new Howl({ src: [newSongSrc], loop: true, volume: 0 });

        newSong.once('play', () => {
            fadeOutAndStop(oldSong, FADE_DURATION);
            newSong.fade(0, TARGET_VOLUME, FADE_DURATION);
        });

        newSong.play();
        currentSong.current = newSong;
    }

    /**
     * Cleanup effect to stop and unload the current song when the component
     * unmounts to prevent memory leaks and orphaned audio playback.
     */
    useEffect(() => {
        return () => {
            if (currentSong.current) {
                currentSong.current.stop();
                currentSong.current.unload();
            }
        };
    }, []);

    /**
     * Effect hook that triggers whenever the dopamine level changes.
     * It selects a new random song based on the level and initiates
     * a transition from the current track to the new one.
     */
    useEffect(() => {
        const songName = getRandomSong(level);
        setCurrentSong(songName);
    }, [level, setCurrentSong]);
        
    /**
     * Effect hook that handles playing or transitioning to the active song.
     */
    useEffect(() => {
        if (!activeSong) {
            if (currentSong.current) {
                fadeOutAndStop(currentSong.current);
                currentSong.current = null;
            }
            return;
        }

        const nextSongSrc = getMusicUrl(activeSong);

        if (currentSong.current) {
            transitionSong(currentSong.current, nextSongSrc);
        } else {
            currentSong.current = playMusic(nextSongSrc);
        }
    }, [activeSong]);

    return null; // A background component doesn't need to render any UI
}
