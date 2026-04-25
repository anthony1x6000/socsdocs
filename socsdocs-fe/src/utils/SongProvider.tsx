import { useState, type ReactNode, useCallback, useMemo } from 'react';
import { SongContext } from './useSong';

/**
 * Props for the SongProvider component.
 */
interface SongProviderProps {
    /** The child components that will have access to the song context. */
    children: ReactNode;
}

/**
 * Provider component that manages the global state of the currently active background song.
 *
 * @param {SongProviderProps} props - Component props containing children.
 * @returns {JSX.Element} The Provider component.
 */
export function SongProvider({ children }: SongProviderProps) {
    const [currentSong, setCurrentSongState] = useState<string | null>(null);

    const setCurrentSong = useCallback((song: string | null) => {
        setCurrentSongState(song);
    }, []);

    const value = useMemo(() => ({ currentSong, setCurrentSong }), [currentSong, setCurrentSong]);

    return (
        <SongContext.Provider value={value}>
            {children}
        </SongContext.Provider>
    );
}
