import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material/styles';

interface LoadingBackdropProps {
  open: boolean;
}

const LoadingBackdrop: React.FC<LoadingBackdropProps> = ({ open }) => {
const theme = useTheme();

  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: theme.zIndex.modal + 1,
      }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingBackdrop;
