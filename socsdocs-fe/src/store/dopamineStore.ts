import { createStore, type StoreApi } from 'zustand';

/**
 * Represents the state of the dopamine store.
 */
export interface DopamineState {
    level: number; // current 1..5 level
}

/**
 * Creates a standalone store instance for managing dopamine levels.
 *
 * @param initialLevel - The starting dopamine level. Defaults to 1.
 * @returns A Zustand store instance configured with DopamineState.
 */
export const createDopamineStore = (initialLevel: number = 1) => {
    return createStore<DopamineState>(() => ({
        level: initialLevel,
    }));
};

/**
 * External store action to set the dopamine level.
 * 
 * @param store - The store instance to update.
 * @param userInput - The new dopamine level.
 */
export const setDopamineLevel = (store: StoreApi<DopamineState>, userInput: number) => {
    const parsedLevel = userInput;
    if (isNaN(parsedLevel)) {
        console.warn(`Invalid level provided: "${userInput}" is not a valid number. Setting to default level 1.`);
        store.setState({ level: 1 });
        return;
    }
    const clampedLevel = Math.max(1, Math.min(5, parsedLevel));
    store.setState({ level: clampedLevel });
};

/**
 * Singleton store instance for backward compatibility and default app use.
 * Initialized with a default dopamine level of 1.
 */
export const singletonStore = createDopamineStore(1);
