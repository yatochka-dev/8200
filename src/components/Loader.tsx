import { type FC } from 'react';
import { Box, CircularProgress } from '@mui/material';

interface LoaderProps {
  width: number | string;
  height: number | string;
}

const Loader: FC<LoaderProps> = ({ width, height }) => {
  return (
    <Box
      sx={{
        width: width,
        height: height,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;
