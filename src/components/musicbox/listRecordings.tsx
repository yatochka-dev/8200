import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle, Grid,
    List,
    ListItem,
    Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import {type ListOfRecordingsType, type RecordingType, type RecordingTypeVerbose} from "@/utils/types";

interface EndAddingProps {
    open: boolean,
    onClose: () => void,
    play: (recording: RecordingType) => void,
}

export default function ListRecordings({open, play, onClose,}: EndAddingProps) {

    const [recordings, setRecordings] = useState<ListOfRecordingsType>([]);

    function loadRecordings() {

        const raw = localStorage.getItem("recordings")
        if (raw) {
            setRecordings(JSON.parse(raw) as ListOfRecordingsType);
        }
    }

    useEffect(() => {
        loadRecordings();
    }, []);

    function handlePlay(recording: RecordingTypeVerbose) {
        console.log("Playing recording: ", recording)
        play(recording.recording);
        onClose();

    }

    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }} component={"div"}>
                <Typography variant={"h6"}>
                    My Recordings
                </Typography>
                <Box>
                    <Button variant={"text"} color={"secondary"} onClick={loadRecordings}>Reload</Button>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Typography sx={{mb: 4}}>
                    Here are your recordings:
                </Typography>
                <Grid container spacing={4}>
                    {
                        recordings.map((recording, index) => (
                            <Grid key={index} item>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '100%',
                                    gap: 1,
                                }}>
                                    <Box>
                                        <Typography variant={'subtitle1'}>{index + 1}. {recording.name}</Typography>
                                    </Box>
                                    <Box>
                                        <Button onClick={() => handlePlay(recording)} size={"small"}>Play</Button>
                                    </Box>
                                </Box>
                            </Grid>
                        ))
                    }
                </Grid>
            </DialogContent>


        </Dialog>
    )
}