import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Paper,
  Slider,
  Tooltip,
  Typography,
} from "@mui/material";
import { type ChangeEvent, useMemo, useState } from "react";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import ImageEditor from "@/components/picshare/ImageEditor";
import SaveAsRoundedIcon from "@mui/icons-material/SaveAsRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import Pocketbase, { type Record } from "pocketbase";

const sliderMarks: { value: number; label: string }[] = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 5,
    label: "5",
  },
  {
    value: 10,
    label: "10",
  },
  {
    value: 15,
    label: "15",
  },
  {
    value: 20,
    label: "20",
  },
];

const pocketbase = new Pocketbase("http://127.0.0.1:8090");

export default function Picshare() {
  const [file, setFile] = useState<File | null>(null);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);

  function shareImage() {
    if (!canvas) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    canvas.toBlob(async (blob) => {
      if (!blob) {
        return;
      }

      const formData = new FormData();
      formData.append("image", blob);

      const sharedImage = await pocketbase
        .collection("sharedImages")
        .create<{ image: string } & Record>(formData);

      const currentDomainAndHttp = window.location.href
        .split("/")
        .slice(0, 3)
        .join("/");
      const url = `${currentDomainAndHttp}/shares/${sharedImage.id}`;

      const shareData = {
        title: "My edited image",
        text: "Check out my edited image!",
        url: url,
      };

      navigator.share(shareData).catch(console.error);
    });
  }

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = (event.target as HTMLInputElement).files;

    if (files && files.length > 0) {
      if (files[0]) {
        setFile(files[0]);
      }
    }
  };

  const saveImage = () => {
    if (canvas) {
      const dataUrl = canvas.toDataURL();
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "edited-image.png";
      link.click();
    }
  };

  const hasFile = useMemo(() => file !== null, [file]);

  return (
    <Box component={"section"} sx={{}}>
      {hasFile ? (
        <Box
          sx={{
            width: "100%",
            height: "calc(100svh - 64px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Paper
            sx={{
              backgroundColor: "transparent",
            }}
            variant={"outlined"}
          >
            {file && (
              <ImageEditor
                file={file}
                onChange={(canvas) => setCanvas(canvas)}
                color={color}
                brushSize={brushSize}
              />
            )}
          </Paper>

          {/* Toolbar */}
          <Grid
            sx={{
              width: "100%",
              mt: 5,
            }}
            container
            spacing={2}
          >
            <Grid item>
              <Button
                component={"label"}
                endIcon={
                  <Box
                    sx={{
                      height: "20px",
                      width: "20px",
                      backgroundColor: color,
                    }}
                  />
                }
              >
                Change Color
                <input
                  type="color"
                  hidden
                  onChange={(event) => setColor(event.target.value)}
                />
              </Button>
            </Grid>

            <Grid item>
              <Box
                sx={{
                  width: "300px",
                }}
              >
                <Tooltip title={"Brush Size"}>
                  <Slider
                    value={brushSize}
                    onChange={(event, value, _activeThumb) => {
                      if (typeof value === "number") {
                        setBrushSize(value);
                      }
                    }}
                    marks={sliderMarks}
                    min={1}
                    max={20}
                  />
                </Tooltip>
              </Box>
            </Grid>
            <Grid item>
              <Button
                component={"label"}
                variant={"outlined"}
                endIcon={<FileUploadRoundedIcon />}
              >
                Upload new image
                <input type="file" hidden onChange={handleUpload} />
              </Button>
            </Grid>
            <Grid item>
              <ButtonGroup variant={"contained"}>
                <Button endIcon={<SaveAsRoundedIcon />} onClick={saveImage}>
                  Save
                </Button>
                <Button endIcon={<ShareRoundedIcon />} onClick={shareImage}>
                  Share
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "calc(100svh - 64px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            sx={{
              width: "100%",
              height: "calc(50svh - 64px)",
              mt: -5,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
            variant={"outlined"}
          >
            <Typography variant={"h5"} color={"text.secondary"}>
              There&apos;s no image to edit.
            </Typography>

            <Button
              component={"label"}
              variant={"outlined"}
              endIcon={<FileUploadRoundedIcon />}
            >
              Upload Image
              <input type="file" hidden onChange={handleUpload} />
            </Button>
          </Paper>
        </Box>
      )}
    </Box>
  );
}
