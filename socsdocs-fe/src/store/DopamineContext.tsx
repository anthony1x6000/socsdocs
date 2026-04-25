import { createContext } from 'react';
import { createDopamineStore } from './dopamineStore';

/**
 * React context that holds a Dopamine store instance.
 * Defaults to null to allow for fallback logic in the useDopamineStore hook.
 */
export const DopamineContext = createContext<ReturnType<typeof createDopamineStore> | null>(null);
