import { createStore } from 'zustand';

/**
 * Represents the state of the dopamine store.
 */
export interface DopamineState {
    level: number; // current 1..5 level
    setLevel: (userInput: number) => void; // update level based on userin
}

/**
 * Creates a standalone store instance for managing dopamine levels.
 *
 * @param initialLevel - The starting dopamine level. Defaults to 1.
 * @returns A Zustand store instance configured with DopamineState.
 */
export const createDopamineStore = (initialLevel: number = 1) => {
    return createStore<DopamineState>((set) => ({
        level: initialLevel,
        setLevel: (userInput: number) => {
            const parsedLevel = userInput;
            if (isNaN(parsedLevel)) {
                console.warn(`Invalid level provided: "${userInput}" is not a valid number. Setting to default level 1.`);
                set({ level: 1 });
                return;
            }
            const clampedLevel = Math.max(1, Math.min(5, parsedLevel));
            set({ level: clampedLevel });
        },
    }));
};

/**
 * Singleton store instance for backward compatibility and default app use.
 * Initialized with a default dopamine level of 1.
 */
export const singletonStore = createDopamineStore(1);
