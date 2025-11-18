import * as Icons from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import React from 'react';

export type LucideIconName = keyof typeof Icons;

type IconProps = {
  name?: LucideIconName | string;
  className?: string;
  size?: number;
  strokeWidth?: number;
  children?: React.ReactNode;
};

export const IconComponent: React.FC<IconProps> = ({
  name,
  className = '',
  size = 24,
  strokeWidth,
  children,
}) => {
  const isValidLucideIcon = typeof name === 'string' && name in Icons;

  if (isValidLucideIcon) {
    const LucideIcon = Icons[name as LucideIconName] as React.FC<LucideProps>;
    return (
      <LucideIcon className={className} size={size} strokeWidth={strokeWidth} />
    );
  }

  return (
    <div className={className} style={{ width: size, height: size }}>
      {children}
    </div>
  );
};
