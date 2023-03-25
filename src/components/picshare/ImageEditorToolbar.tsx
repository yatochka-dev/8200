import { type ChangeEvent, type FC } from 'react';
import { Box, Button, ButtonGroup, Grid, Slider, Tooltip } from '@mui/material';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';

const sliderMarks: { value: number; label: string }[] = [
  {
    value: 1,
    label: '1',
  },
  {
    value: 5,
    label: '5',
  },
  {
    value: 10,
    label: '10',
  },
  {
    value: 15,
    label: '15',
  },
  {
    value: 20,
    label: '20',
  },
];

interface ImageEditorToolbarProps {
  backgroundColor: string;
  onColorChange: (event: ChangeEvent<HTMLInputElement>) => void;
  brushSize: number;
  onBrushChange: (
    _event: Event,
    value: number | number[],
    _activeThumb: number
  ) => void;
  onFileReUploadChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSaveClick: () => void;
  onShareClick: () => void;
}

const ImageEditorToolbar: FC<ImageEditorToolbarProps> = ({
  brushSize,
  onBrushChange,
  onColorChange,
  onFileReUploadChange,
  onSaveClick,
  onShareClick,
  backgroundColor,
}) => (
  <Grid
    sx={{
      width: '100%',
      mt: 5,
    }}
    container
    spacing={2}
  >
    <Grid item>
      <Button
        component={'label'}
        endIcon={
          <Box
            sx={{
              height: '20px',
              width: '20px',
              backgroundColor: backgroundColor,
            }}
          />
        }
      >
        Change Color
        <input type="color" hidden onChange={onColorChange} />
      </Button>
    </Grid>

    <Grid item>
      <Box
        sx={{
          width: '300px',
        }}
      >
        <Tooltip title={'Brush Size'}>
          <Slider
            value={brushSize}
            onChange={onBrushChange}
            marks={sliderMarks}
            min={1}
            max={20}
          />
        </Tooltip>
      </Box>
    </Grid>
    <Grid item>
      <Button
        component={'label'}
        variant={'outlined'}
        endIcon={<FileUploadRoundedIcon />}
      >
        Upload new image
        <input type="file" hidden onChange={onFileReUploadChange} />
      </Button>
    </Grid>
    <Grid item>
      <ButtonGroup variant={'contained'}>
        <Button endIcon={<SaveAsRoundedIcon />} onClick={onSaveClick}>
          Save
        </Button>
        <Button endIcon={<ShareRoundedIcon />} onClick={onShareClick}>
          Share
        </Button>
      </ButtonGroup>
    </Grid>
  </Grid>
);

export default ImageEditorToolbar;
