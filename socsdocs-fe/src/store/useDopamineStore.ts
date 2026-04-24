import {create} from 'zustand';

interface DopamineState {
    level: 1 | 2 | 3 | 4 | 5;

    // AppState['level'] indicates that the userInput must be the same type as level defined in AppState. 

    /**
     * Sets the dopamine level in the store.
     * @param userInput The new level to set either 1..5 or a string of 1..5
     * @returns {void}
     */
    setLevel: (userInput: DopamineState['level'] | '1' | '2' | '3' | '4' | '5') => void; 
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
 *   console.log(level); // Access the current level
 * }
 * ```
 */
const useDopamineStore = create<DopamineState>()((set) => ({
    level: 1,

    // calling the name of the function with setLevel 
    // => set({level: userInput}) calls the zustand 'set' function, to update the state of the store 
    setLevel: (userInput) => {
        // if userInput is a string, parseInt, else just pass userInput as is. 
        
        // typeof userInput === 'string' checks if the runtime type of userInput is a string.
            // The '===' is the strict equality operator.
        const newLevel = typeof userInput === 'string' ? parseInt(userInput, 10) : userInput;
        if (newLevel >= 1 && newLevel <= 5) {
            // set level member of interface 
            // as DopamineState['level'] tells TS that the value is certainly the type of DopamineState['level']
            set({ level: newLevel as DopamineState['level'] }); 
        } else {
            console.warn(`Invalid level provided: ${userInput} not 1..5`);
        }
    },
}));

export default useDopamineStore;