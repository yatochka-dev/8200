import { type MusicBoxType } from '@/hooks/useMusicBox';
import { type useMusicBoxSoundsType } from '@/hooks/useMusicBoxSounds';
import { type useMusicBoxButtonsType } from '@/hooks/useMusicBoxButtons';
import { type noteType } from '@/utils/types';
import { Box, Button, ButtonGroup, Paper, Typography } from '@mui/material';
import GraphicEqRoundedIcon from '@mui/icons-material/GraphicEqRounded';
import StopIcon from '@mui/icons-material/Stop';
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import PlayCircleFilledWhiteRoundedIcon from '@mui/icons-material/PlayCircleFilledWhiteRounded';
import { calc } from '@/utils';

export default function DefaultMusicBox({
  musicBox,
  sounds,
  buttons,
  playSound,
}: {
  musicBox: MusicBoxType;
  sounds: useMusicBoxSoundsType;
  buttons: useMusicBoxButtonsType;
  playSound: (note: noteType) => void;
}) {
  const disabled = musicBox.playing;
  return (
    <Paper
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 4,
        maxHeight: calc('100svh - 80px'),
        my: {
          md: 10,
          sm: 8,
          xs: 6,
        },
      }}
      variant={'outlined'}
    >
      <Box>
        <Typography
          variant={'h4'}
          sx={{
            mb: {
              xl: 4,
              lg: 4,
              md: 3,
              sm: 2,
              xs: 2,
            },
          }}
        >
          Music Box
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          mb: {
            xl: 4,
            lg: 4,
            md: 3,
            sm: 2,
            xs: 2,
          },
        }}
      >
        <Button
          variant={'outlined'}
          endIcon={<GraphicEqRoundedIcon />}
          onClick={musicBox.actions.openListModal}
          disabled={disabled}
        >
          My Recordings
        </Button>
        {disabled && (
          <Button
            onClick={musicBox.actions.stopPlaying}
            endIcon={<StopIcon />}
            color={'error'}
          >
            Stop playing
          </Button>
        )}
        {musicBox.recording ? (
          <Button
            variant={'contained'}
            endIcon={<FiberManualRecordRoundedIcon />}
            color={'error'}
            onClick={musicBox.actions.stopRecording}
          >
            Finish Recording
          </Button>
        ) : (
          <Button
            variant={'outlined'}
            endIcon={<PlayCircleFilledWhiteRoundedIcon />}
            onClick={musicBox.actions.startRecording}
            disabled={disabled}
          >
            Start Recording
          </Button>
        )}
      </Box>
      <ButtonGroup
        variant={'contained'}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row',
          width: '100%',
          '& > *': {
            height: {
              xl: 200,
              lg: 160,
              md: 120,
              sm: 100,
              xs: 60,
            },
            flexGrow: 1,
          },
        }}
      >
        {Object.keys(sounds).map((sound, index) => {
          return (
            <Button
              key={`${index}`}
              onClick={() => {
                playSound(sound as noteType);
              }}
              disableElevation
              sx={{
                borderRight: '1px black solid !important',
                backgroundColor: 'white',
                '&:hover': {
                  backgroundColor: '#e0e0e0',
                },
              }}
              ref={buttons[sound as noteType]}
            >
              {`${sound === 'hDo' ? 'Do' : sound}`.toLowerCase()}
            </Button>
          );
        })}
      </ButtonGroup>
    </Paper>
  );
}
