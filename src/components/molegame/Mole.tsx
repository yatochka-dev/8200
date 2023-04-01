import { Box } from '@mui/material';
import React, {
  type MouseEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import Image from 'next/image';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

interface MoleProps {
  position: {
    x: number;
    y: number;
  };
  onClick: () => void;
}

const Mole: React.FC<MoleProps> = ({ position, onClick }) => {
  const [isWhacked, setIsWhacked] = useState(false);

  useEffect(() => {
    setIsWhacked(false);
  }, [position]);

  const handleMoleClick = useCallback(
    (_: MouseEvent<HTMLDivElement>) => {
      if (!isWhacked) {
        setIsWhacked(true);
        onClick();
      } else {
        console.log('Mole is already whacked');
      }
    },
    [isWhacked, onClick]
  );

  if (isWhacked) {
    return (
      <Box
        sx={{
          width: {
            xl: 90,
            lg: 90,
            md: 80,
            sm: 70,
            xs: 70,
          },
          height: {
            xl: 90,
            lg: 90,
            md: 80,
            sm: 70,
            xs: 70,
          },
          position: 'absolute',
          top: position.y,
          left: position.x,
          cursor: 'not-allowed',
        }}
      >
        <CloseRoundedIcon
          sx={{
            fontSize: 90,
          }}
          color={'error'}
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: {
          xl: 90,
          lg: 90,
          md: 80,
          sm: 70,
          xs: 70,
        },
        height: {
          xl: 90,
          lg: 90,
          md: 80,
          sm: 70,
          xs: 70,
        },
        position: 'absolute',
        top: position.y,
        left: position.x,
        cursor: 'pointer',
      }}
      onClick={handleMoleClick}
    >
      <Image
        src={'/mole.png'}
        width={90}
        height={90}
        alt={'Mole 2d Image'}
      ></Image>
    </Box>
  );
};

export default Mole;
