// pic share types
export type AppType = "picshare" | "musicbox" | "molegame";

// music box types
export type RecordingNameType = string;
export type noteType = "do" | "re" | "mi" | "fa" | "sol" | "la" | "si" | "hDo";
export type RecordingType = noteType[];
export type RecordingTypeVerbose = {
  name: RecordingNameType;
  recording: RecordingType;
};
export type ListOfRecordingsType = RecordingTypeVerbose[];

// mole game types
export type Position = {
  x: number;
  y: number;
};
export type MoleType = {
  id: string;
  position: Position;
};
