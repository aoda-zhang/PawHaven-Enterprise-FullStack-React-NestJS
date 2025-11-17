// The function is get icon from lucide-react
// The parameter name MUST be from lucide-react
// e.g.  import { Camera } from 'lucide-react';  the name should be Camera
import * as Icons from 'lucide-react';
import type { FC } from 'react';

const getIconByName = (name: string): FC<unknown> | undefined => {
  return (Icons as unknown as Record<string, FC<unknown>>)[name];
};

export default getIconByName;
