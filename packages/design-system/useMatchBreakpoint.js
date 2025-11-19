// A responsive hook that checks whether the current viewport width meets a given breakpoint.
// Accepts either a breakpoint name (e.g. "md") or a numeric pixel value.
import { useState, useEffect, useCallback } from 'react';

import BREAKPOINTS from './breakpoints';

export const useMatchBreakpoint = (input) => {
  // Resolve the breakpoint value: if a number is passed, use it directly;
  // if a key is passed (e.g. "md"), retrieve the breakpoint value from the BREAKPOINTS map.
  const getTarget = useCallback(() => {
    return typeof input === 'number' ? input : BREAKPOINTS[input];
  }, [input]);

  // Initial match check. On the server, always return false to avoid SSR window errors.
  // On the client, compare current window width against the target breakpoint.
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return getTarget() >= window.innerWidth;
  });

  // Listen for viewport resize events so the hook updates in real time.
  // Recompute whether the viewport meets the breakpoint on every resize.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const check = () => {
      setMatches(getTarget() >= window.innerWidth);
    };

    window.addEventListener('resize', check);
    // eslint-disable-next-line consistent-return
    return () => window.removeEventListener('resize', check);
  }, [getTarget, input]);

  // Return whether the current viewport width is greater than or equal to the target breakpoint.
  return matches;
};
