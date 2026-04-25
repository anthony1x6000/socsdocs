import { createStore, useStore } from 'zustand';
import { createContext, useContext, ReactNode, useMemo } from 'react';

interface DopamineState {
    level: number;
    setLevel: (userInput: number) => void;
}

/**
 * Creates a standalone store instance.
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

// Singleton store for backward compatibility and default app use
const singletonStore = createDopamineStore(1);

// Context for Storybook and scoped instances
const DopamineContext = createContext<ReturnType<typeof createDopamineStore> | null>(null);

/**
 * Provider to wrap components that need an independent dopamine store.
 */
export const DopamineProvider = ({ children, initialLevel = 1 }: { children: ReactNode, initialLevel?: number }) => {
    // We use useMemo to ensure the store is only created once per provider instance
    const store = useMemo(() => createDopamineStore(initialLevel), [initialLevel]);
    
    return (
        <DopamineContext.Provider value={store}>
            {children}
        </DopamineContext.Provider>
    );
};

/**
 * The main hook used by components.
 * It will use the store from DopamineProvider if available, otherwise fall back to the singleton store.
 */
export const useDopamineStore = <T,>(selector: (state: DopamineState) => T): T => {
    const contextStore = useContext(DopamineContext);
    const store = contextStore || singletonStore;
    return useStore(store, selector);
};

// Exporting as default to maintain compatibility with existing imports
export default useDopamineStore;
