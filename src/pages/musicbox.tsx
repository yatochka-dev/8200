import { Box, Paper, Typography } from '@mui/material';
import EndAdding from '@/components/musicbox/endAdding';
import ListRecordings from '@/components/musicbox/listRecordings';
import {
  type ListOfRecordingsType,
  type noteType,
  type RecordingNameType,
  type RecordingType,
  type RecordingTypeVerbose,
} from '@/utils/types';
import useMusicBox from '@/hooks/useMusicBox';
import useMusicBoxSounds from '@/hooks/useMusicBoxSounds';
import useMusicBoxButtons from '@/hooks/useMusicBoxButtons';
import { SoundComponents } from '@/components/musicbox/soundComponents';
import { useOrientation } from '@/hooks/useOrientantion';
import { DefaultMusicBox } from '@/components/musicbox/MusicBoxUI';
import ScreenRotationRoundedIcon from '@mui/icons-material/ScreenRotationRounded';

export default function Musicbox() {
  const musicBox = useMusicBox();
  const {
    recording,
    playing,
    saving,
    currentRecording,
    openRecordings,
    actions,
  } = musicBox;

  const sounds = useMusicBoxSounds();
  const buttons = useMusicBoxButtons();

  const orientation = useOrientation();

  const showUI = orientation === 'landscape';

  const playSound = (sound: noteType) => {
    const soundRef = sounds[sound];
    if (!soundRef) return;

    const audio = soundRef.current;
    if (audio instanceof HTMLAudioElement) {
      audio.currentTime = 0;
      audio.play().catch(console.error);

      if (recording) {
        actions.whileRecording.addNote(sound);
      }
    }
  };

  async function playFromRecording(recording: RecordingType) {
    actions.startPlaying();
    let currentNoteNumber = 0;

    while (currentNoteNumber < recording.length) {
      const note = recording[currentNoteNumber];

      if (!note) continue;

      // Get the button that corresponds to the note
      const buttonRef = buttons[note];

      // If the button exists
      if (buttonRef.current instanceof HTMLButtonElement) {
        const button = buttonRef.current;

        // change the color of the button, to make it look like it's being pressed
        button.style.backgroundColor = '#e0e0e0';

        // play the sound
        button.click();

        // change the color back after 200ms
        await new Promise((resolve) => setTimeout(resolve, 200));
        button.style.backgroundColor = '#fff';
      }

      currentNoteNumber++;
      await new Promise((resolve) => setTimeout(resolve, 150));
    }
    actions.stopPlaying();
  }

  function save(name: RecordingNameType) {
    // get from local storage
    let recordings = localStorage.getItem('recordings');
    if (!recordings) {
      recordings = '[]';
    }

    // parse to array
    const recordingsArray = JSON.parse(recordings) as ListOfRecordingsType;
    const newRecording: RecordingTypeVerbose = {
      name,
      recording: currentRecording,
    };
    // add new recording
    recordingsArray.push(newRecording);

    // save to local storage
    localStorage.setItem('recordings', JSON.stringify(recordingsArray));
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: 'calc(100vh - 64px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <EndAdding
        open={saving}
        onClose={actions.endRecording}
        recording={currentRecording}
        cancel={actions.endRecording}
        save={save}
      />
      <ListRecordings
        open={openRecordings}
        onClose={actions.closeListModal}
        play={playFromRecording}
      />

      {showUI ? (
        <DefaultMusicBox
          musicBox={musicBox}
          sounds={sounds}
          buttons={buttons}
          playSound={playSound}
        />
      ) : (
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
      )}

      <SoundComponents sounds={sounds} />
    </Box>
  );
}
