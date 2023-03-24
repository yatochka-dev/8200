export type AppType = "picshare" | "musicbox" | "molegame";
export type RecordingNameType = string;
export type noteType = "do" | "re" | "mi" | "fa" | "sol" | "la" | "si" | "hDo";
export type RecordingType = noteType[];
export type RecordingTypeVerbose = {
    name: RecordingNameType;
    recording: RecordingType;
}

export type ListOfRecordingsType = RecordingTypeVerbose[];
