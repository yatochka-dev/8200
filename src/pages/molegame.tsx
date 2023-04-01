import { Box, Button, Paper, Typography } from '@mui/material';
import { type MouseEvent, useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import Loader from '@/components/Loader';
import EndGameDialog from '@/components/molegame/EndGameDialog';
import { useOrientation } from '@/hooks/useOrientantion';
import ScreenRotationRoundedIcon from '@mui/icons-material/ScreenRotationRounded';

const GameBoard = dynamic(
  () => {
    return import('@/components/molegame/GameBoard');
  },
  {
    loading: () => <Loader width={'100%'} height={400} />,
  }
);

export default function Molegame() {
  const [playing, setPlaying] = useState(false);
  const orientation = useOrientation();
  const showUI = orientation === 'landscape';

  const [endGameDialog, setEndGameDialog] = useState<{
    score: number;
    timeInGame: number;
  } | null>(null);

  const handleStart = useCallback((_: MouseEvent<HTMLButtonElement>) => {
    setPlaying(true);
  }, []);

  const handleStop = useCallback((_: MouseEvent<HTMLButtonElement>) => {
    setPlaying(false);
  }, []);

  function handleGameEnd(score: number, timeInGame: number) {
    setEndGameDialog({
      score,
      timeInGame,
    });
  }

  const onDialogClose = useCallback(() => {
    setEndGameDialog(null);
  }, []);

  return (
    <>
      {showUI ? (
        <Box
          sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography
            variant={'h2'}
            align={'center'}
            gutterBottom
            sx={{
              display: !playing ? 'initial' : 'none',
            }}
          >
            Mole Game
          </Typography>
          {playing ? (
            <GameBoard handleGameEnd={handleGameEnd} />
          ) : (
            <Typography variant={'h4'} align={'center'} gutterBottom>
              Click the button below to start the game
            </Typography>
          )}
          {!playing ? (
            <Button onClick={handleStart}>Start the Game!</Button>
          ) : (
            <Button
              onClick={handleStop}
              sx={{
                mt: 2,
              }}
              color={'error'}
              variant={'outlined'}
            >
              Stop the Game!
            </Button>
          )}
          <EndGameDialog
            endGameDialog={endGameDialog}
            onClose={onDialogClose}
          />
        </Box>
      ) : (
        <>
          <Paper
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              p: 4,
            }}
            variant={'outlined'}
          >
            <Box>
              <Typography variant={'caption'} color={'text.secondary'}>
                Rotate your phone to landscape position
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mt: 2,
                }}
              >
                <ScreenRotationRoundedIcon
                  sx={{
                    fontSize: '5rem',
                  }}
                />
              </Box>
            </Box>
          </Paper>
        </>
      )}
    </>
  );
}
