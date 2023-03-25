import { useState } from 'react';
import { type noteType, type RecordingType } from '@/utils/types';

export interface MusicBoxActions {
  openListModal: () => void;
  closeListModal: () => void;
  startRecording: () => void;
  stopRecording: () => void;
  endRecording: () => void;
  startPlaying: () => void;
  stopPlaying: () => void;
  whileRecording: { addNote: (note: noteType) => void };
}

export interface MusicBoxType {
  recording: boolean;
  saving: boolean;
  playing: boolean;
  openRecordings: boolean;
  currentRecording: noteType[];
  actions: MusicBoxActions;
}

export default function useMusicBox() {
  const [recording, setRecording] = useState(false);
  const [saving, setSaving] = useState(false);
  const [openRecordings, setOpenRecordings] = useState(false);
  const [currentRecording, setCurrentRecording] = useState<RecordingType>([]);
  const [playing, setPlaying] = useState(false);

  return <MusicBoxType>{
    recording,
    saving,
    playing,
    openRecordings,
    currentRecording,

    actions: <MusicBoxActions>{
      openListModal: () => setOpenRecordings(true),
      closeListModal: () => setOpenRecordings(false),
      startRecording: () => {
        if (playing) {
          return;
        }

        setRecording(true);
        setCurrentRecording([]);
      },
      stopRecording: () => {
        setPlaying(false);
        setRecording(false);
        setSaving(true);
      },
      endRecording: () => {
        setPlaying(false);
        setSaving(false);
        setCurrentRecording([]);
      },
      startPlaying: () => {
        if (recording) {
          return;
        }
        console.log('Start playing');
        setPlaying(true);
        console.log(playing);
      },
      stopPlaying: () => {
        setPlaying(false);
        // reload page
        window.location.reload();
      },
      whileRecording: {
        addNote: (note: noteType) => {
          if (recording) {
            setCurrentRecording([...currentRecording, note]);
          }
        },
      },
    },
  };
}
