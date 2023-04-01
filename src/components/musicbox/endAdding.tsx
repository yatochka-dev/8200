import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import useField from '@/hooks/useField';
import type { ListOfRecordingsType, RecordingNameType } from '@/utils/types';
import { FormEvent } from 'react';

interface EndAddingProps {
  open: boolean;
  recording: string[];
  onClose: () => void;
  cancel: () => void;
  save: (name: string) => void;
}

export default function EndAdding({
  open,
  recording,
  onClose,
  cancel,
  save,
}: EndAddingProps) {
  const { value, register } = useField<RecordingNameType>(
    '',
    'Enter the name of your new recording.',
    (value) => {
      // Check if the recording name is empty
      if (value.length <= 0) {
        return 'Recording name cannot be empty';
        // Check if the recording name is too long
      } else if (value.length > 20) {
        return 'Recording name cannot be longer than 20 characters';
        // Check if the recording name already exists
      } else {
        const raw = localStorage.getItem('recordings');
        if (raw) {
          const recordings = JSON.parse(raw) as ListOfRecordingsType;
          for (const recording of recordings) {
            if (recording.name === value) {
              return 'Recording name already exists';
            }
          }
        }
      }
      // If none of the above conditions are met, return null (means = no error)
      return null;
    }
  );

  const recordingEmpty = recording.length <= 0;

  const onSave = (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (register.error || recordingEmpty) {
      return;
    }
    save(value);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Save recording</DialogTitle>
      <DialogContent>
        <Box component={'form'} onSubmit={onSave}>
          <Typography sx={{ mb: 4 }}>
            You sure you want to save this recording?
          </Typography>
          <TextField
            {...register}
            variant={'filled'}
            label={'Recording Name'}
            sx={{
              width: '100%',
              mb: 4,
            }}
            required
          />

          <Accordion variant={'outlined'}>
            <AccordionSummary>
              <Typography>Preview notes</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {recording.map((note, index) => (
                  <span key={index}>{note}, &nbsp;</span>
                ))}
              </Typography>
            </AccordionDetails>
          </Accordion>
          {recordingEmpty && (
            <Typography
              variant={'caption'}
              color={'error'}
              sx={{
                px: 3,
              }}
            >
              You cannot save an empty recording.
            </Typography>
          )}
          <DialogActions
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              px: 0,
              pt: 3,
            }}
          >
            <Button type={'submit'} disabled={register.error || recordingEmpty}>
              Save
            </Button>
            <Button
              color={'error'}
              onClick={() => {
                cancel();
                onClose();
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
