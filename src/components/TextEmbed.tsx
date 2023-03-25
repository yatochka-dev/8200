import { Paper, Typography } from '@mui/material';

export function TextEmbed({ text }: { text: string }) {
  return (
    <Paper
      sx={{
        width: 200,
        height: 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography>{text}</Typography>
    </Paper>
  );
}
