import {Box, Button} from "@mui/material";
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import {ChangeEventHandler, useState} from "react";
import ImageEditor from "@/components/picshare/ImageEditor";

export default function Picshare() {
    const [file, setFile] = useState<File>(null);

    const handleUpload = (event: ChangeEventHandler<HTMLInputElement>) => {
        const files = (event.target as HTMLInputElement).files

        if (files && files.length > 0) {
            if (files[0]) {
                setFile(files[0])
            }
        }
    }

    function handleUpdate() {
        console.log("update");
    }

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column"
        }}>

            {/*  Image  */}
            {/*<Box sx={{*/}
            {/*    width: "100%",*/}
            {/*    maxHeight: "calc(70vh - 64px)",*/}
            {/*}}>*/}
            {/*    <img src={URL.createObjectURL(file)} alt={file.name} style={{*/}
            {/*        width: "100%",*/}
            {/*        maxHeight: "calc(50vh - 64px)"*/}
            {/*    }}/>*/}
            {/*</Box>*/}
            {
                file && <ImageEditor file={file}/>
            }
            {/*  Toolbar  */}
            <Box>
                <Button
                    variant="contained"
                    component="label"
                    endIcon={<FileUploadRoundedIcon/>}
                >
                    Upload File
                    <input
                        type="file"
                        hidden
                        onChange={handleUpload}
                    />
                </Button>
            </Box>
        </Box>
    )

}