import { type ReactNode, useMemo } from 'react';
import { createDopamineStore } from './dopamineStore';
import { DopamineContext } from './DopamineContext';

/**
 * Provider to wrap components that need an independent dopamine store.
 *
 * @param props - The component props.
 * @param props.children - The child components to render within the provider.
 * @param props.initialLevel - The initial dopamine level to initialize the store with. Defaults to 1.
 * @returns The DopamineContext provider wrapping the provided children.
 */
export function DopamineProvider({ children, initialLevel = 1 }: { children: ReactNode, initialLevel?: number }) {
    // We use useMemo to ensure the store is only created once per provider instance
    const store = useMemo(() => createDopamineStore(initialLevel), [initialLevel]);
    
    return (
        <DopamineContext.Provider value={store}>
            {children}
        </DopamineContext.Provider>
    );
};
