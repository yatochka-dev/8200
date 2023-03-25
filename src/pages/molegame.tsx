import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import GameBoard from "@/components/molegame/GameBoard";
import { type MouseEvent, useCallback, useState } from "react";

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
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h2" align="center" gutterBottom>
        Mole Game
      </Typography>
      {playing ? (
        <GameBoard handleGameEnd={handleGameEnd} />
      ) : (
        <Typography variant="h4" align="center" gutterBottom>
          Click the button below to start the game
        </Typography>
      )}
      {!playing ? (
        <Button onClick={handleStart}>Start the Game!</Button>
      ) : (
        <Button onClick={handleStop}>Stop the Game!</Button>
      )}
      <Dialog open={!!endGameDialog} onClose={onDialogClose}>
        <DialogTitle
          sx={{
            textAlign: "center",
          }}
        >
          The game has ended!
        </DialogTitle>

        <DialogContent>
          {endGameDialog ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h4" align="center" gutterBottom>
                Your score was: {endGameDialog.score}
              </Typography>
              <Typography variant="h4" align="center" gutterBottom>
                Your time in game was: {endGameDialog.timeInGame}
              </Typography>

              <Button
                onClick={onDialogClose}
                variant={"outlined"}
                color={"error"}
                sx={{
                  mt: 2,
                }}
              >
                Close
              </Button>
            </Box>
          ) : (
            <Typography variant="h4" align="center" gutterBottom>
              Loading...
            </Typography>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
