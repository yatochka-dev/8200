import { Box, Button, Typography } from '@mui/material';
import { type MouseEvent, useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import Loader from '@/components/Loader';

const GameBoard = dynamic(
  () => {
    return import('@/components/molegame/GameBoard');
  },
  {
    loading: () => <Loader width={'100%'} height={400} />,
  }
);

const EndGameDialog = dynamic(
  () => {
    return import('@/components/molegame/EndGameDialog');
  },
  {
    loading: () => <>Loading...</>,
  }
);

export default function Molegame() {
  const [playing, setPlaying] = useState(false);
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
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant={'h2'} align={'center'} gutterBottom>
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
        <Button onClick={handleStop}>Stop the Game!</Button>
      )}
      <EndGameDialog endGameDialog={endGameDialog} onClose={onDialogClose} />
    </Box>
  );
}
