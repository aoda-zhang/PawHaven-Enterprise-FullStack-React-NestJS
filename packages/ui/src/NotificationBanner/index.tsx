import { Alert, AlertTitle, Link, Collapse, IconButton } from '@mui/material';
import clsx from 'clsx';
import { X } from 'lucide-react';
import React, { useState } from 'react';

export interface BannerMessage {
  id: string;
  type?: 'info' | 'warning' | 'error' | 'success';
  title?: string;
  message: string;
  linkText?: string;
  linkUrl?: string;
  dismissible?: boolean;
  variant?: 'standard' | 'filled' | 'outlined';
  bannerWrapClassNames?: string;
}

export const NotificationBanner: React.FC<{ banner: BannerMessage }> = ({
  banner,
}) => {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <Collapse in={open}>
      <Alert
        severity={banner.type ?? 'info'}
        variant={banner?.variant ?? 'standard'}
        className={clsx([
          'rounded-none justify-start text-left text-[0.95rem] py-4 px-4 lg:px-20 bg-info',
          banner?.bannerWrapClassNames,
        ])}
        action={
          banner.dismissible ? (
            <IconButton size="small" onClick={() => setOpen(false)}>
              <X />
            </IconButton>
          ) : null
        }
      >
        {banner.title && (
          <AlertTitle className="text-2xl text-left">{banner.title}</AlertTitle>
        )}
        <p className="text-left">{banner.message}</p>
        {banner.linkText && banner.linkUrl && (
          <>
            <Link href={banner.linkUrl} target="_blank" underline="hover">
              {banner.linkText}
            </Link>
          </>
        )}
      </Alert>
    </Collapse>
  );
};
