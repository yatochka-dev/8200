import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

export default function EndGameDialog(props: {
  endGameDialog: { score: number; timeInGame: number } | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={!!props.endGameDialog} onClose={props.onClose}>
      <DialogTitle
        sx={{
          textAlign: 'center',
        }}
      >
        The game has ended!
      </DialogTitle>

      <DialogContent>
        {props.endGameDialog ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant={'h4'} align={'center'} gutterBottom>
              Your score was: {props.endGameDialog.score}
            </Typography>
            <Typography variant={'h4'} align={'center'} gutterBottom>
              Your time in game was: {props.endGameDialog.timeInGame}
            </Typography>

            <Button
              onClick={props.onClose}
              variant={'outlined'}
              color={'error'}
              sx={{
                mt: 2,
              }}
            >
              Close
            </Button>
          </Box>
        ) : (
          <Typography variant={'h4'} align={'center'} gutterBottom>
            Loading...
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
}
