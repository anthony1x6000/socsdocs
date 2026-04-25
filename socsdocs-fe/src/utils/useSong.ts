import { createContext, useContext } from 'react';

/**
 * Interface for the Song Context state and actions.
 */
export interface SongContextType {
    /** The name of the currently active song, or null if none. */
    currentSong: string | null;
    /** Updates the currently active song. */
    setCurrentSong: (song: string | null) => void;
}

/**
 * Context object for the song state.
 */
export const SongContext = createContext<SongContextType | undefined>(undefined);

/**
 * Custom hook to access the current song context.
 * 
 * @returns {SongContextType} The current song and a function to update it.
 * @throws {Error} If the hook is used outside of a SongProvider.
 */
export function useSong() {
    const context = useContext(SongContext);
    if (context === undefined) {
        throw new Error('useSong must be used within a SongProvider');
    }
    return context;
}
