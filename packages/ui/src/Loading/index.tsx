import { CircularProgress, Box } from '@mui/material';
import React from 'react';

export const Loading: React.FC = () => (
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.2)',
      zIndex: 9999,
    }}
  >
    <CircularProgress />
  </Box>
);
