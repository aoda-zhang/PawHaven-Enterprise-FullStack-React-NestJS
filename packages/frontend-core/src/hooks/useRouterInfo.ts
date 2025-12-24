import { useMatches } from 'react-router-dom';
// Get current router information
export const useRouterInfo = <T>(): T => {
  const matches = useMatches();
  const current = matches.at(-1);
  return current as T;
};
