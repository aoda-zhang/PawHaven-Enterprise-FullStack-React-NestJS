import type { FC, ReactNode } from 'react';
import { Suspense } from 'react';

import { Loading } from '../Loading';

export const SuspenseWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};
