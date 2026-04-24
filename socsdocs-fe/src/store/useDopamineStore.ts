import {create} from 'zustand';

interface DopamineState {
    level: number;

    // AppState['level'] indicates that the userInput must be the same type as level defined in AppState. 

    /**
     * Sets the dopamine level in the store.
     * @param userInput The new level to set, which can be a number or a string representation of a number.
     * @returns {void}
     */
    setLevel: (userInput: number) => void;
}

/**
 * Provides the current `level` and a `setLevel` action to update it.
 *
 * @returns A hook to access and modify the dopamine state.
 *
 * @example
 * ```typescript
 * import useDopamineStore from './useDopamineStore';
 *
 * function DopamineComponent() {
 *   const level = useDopamineStore((state) => state.level);
 *   const setLevel = useDopamineStore((state) => state.setLevel);
 *
 *   // Usage:
 *   setLevel(3); // Set level to 3 (number)
 *   setLevel('5'); // Set level to 5 (string)
 * }
 * ```
 */
const useDopamineStore = create<DopamineState>()((set) => ({
    level: 1,

    // calling the name of the function with setLevel 
    // => set({level: userInput}) calls the zustand 'set' function, to update the state of the store
    setLevel: (userInput: number) => {
        const parsedLevel = userInput;

        // Ensure the parsedLevel is a valid number, otherwise default to 1 (or handle as an error)
        if (isNaN(parsedLevel)) {
            console.warn(`Invalid level provided: "${userInput}" is not a valid number. Setting to default level 1.`);
            set({ level: 1 });
            return;
        }
        // Clamp the new level between 1 and 5
        const clampedLevel = Math.max(1, Math.min(5, parsedLevel));
        set({ level: clampedLevel });
    },
}));

export default useDopamineStore;