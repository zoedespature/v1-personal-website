import { createContext, useContext } from 'react';

// True while the home page loader is covering the screen. The page renders
// underneath the loader rather than being swapped out for it, so it ends up in
// the static HTML. That means entrance animations can no longer key off their
// own mount and have to wait for this to flip instead.
export const LoadingContext = createContext(false);

const useIsLoading = () => useContext(LoadingContext);

export default useIsLoading;
