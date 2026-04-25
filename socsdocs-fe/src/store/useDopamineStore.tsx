import { useStore } from 'zustand';
import { useContext } from 'react';
import { singletonStore, type DopamineState } from './dopamineStore';
import { DopamineContext } from './DopamineContext';

/**
 * Accesses the Dopamine store's state.
 *
 * This hook connects to a local `<DopamineProvider>` if one exists in the component tree. \
 * If no provider is found, it automatically falls back to a global singleton store.
 *
 * It first checks for DopamineContext, being that if the component is wrappde in a <DopamineProvider> \
 * If no provider is found, it falls back to singletonStore, outside of the react tree, acting as a global shared state. 
 *
 * @example
 * const level = useDopamineStore((state) => state.level);
 * const setLevel = useDopamineStore((state) => state.setLevel);
 *
 * @param selector - A function to extract a specific piece of state from the store.
 * @returns The selected state value.
 */
export const useDopamineStore = <T,>(selector: (state: DopamineState) => T): T => {
    const contextStore = useContext(DopamineContext);
    const store = contextStore || singletonStore;
    return useStore(store, selector);
};

export default useDopamineStore;
