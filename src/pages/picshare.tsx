import { Box, Button, Paper, Typography } from '@mui/material';
import { type ChangeEvent, useCallback, useMemo, useState } from 'react';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import { type Record } from 'pocketbase';
import dynamic from 'next/dynamic';
import Loader from '@/components/Loader';

const ImageEditor = dynamic(() => import('@/components/picshare/ImageEditor'), {
  loading: () => <Loader height={300} width={300} />,
});

const ImageEditorToolbar = dynamic(
  () => import('@/components/picshare/ImageEditorToolbar'),
  {
    loading: () => <Loader height={320} width={300} />,
  }
);

export default function Picshare() {
  const [file, setFile] = useState<File | null>(null);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [color, setColor] = useState('#000000');
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
      formData.append('image', blob);

      const Pocketbase = (await import('pocketbase')).default;
      const pocketbase = new Pocketbase('http://127.0.0.1:8090');

      const sharedImage = await pocketbase
        .collection('sharedImages')
        .create<{ image: string } & Record>(formData);

      const currentDomainAndHttp = window.location.href
        .split('/')
        .slice(0, 3)
        .join('/');
      const url = `${currentDomainAndHttp}/shares/${sharedImage.id}`;

      const shareData = {
        title: 'My edited image',
        text: 'Check out my edited image!',
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
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'edited-image.png';
      link.click();
    }
  };

  const hasFile = useMemo(() => file !== null, [file]);

  const handleChange = useCallback(
    (canvas: HTMLCanvasElement) => setCanvas(canvas),
    []
  );

  return (
    <Box component={'section'} sx={{}}>
      {hasFile ? (
        <Box
          sx={{
            width: '100%',
            height: 'calc(100svh - 64px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Paper
            sx={{
              backgroundColor: 'transparent',
              minWidth: '100%',
              maxWidth: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
            variant={'outlined'}
          >
            {file && (
              <ImageEditor
                file={file}
                onChange={handleChange}
                color={color}
                brushSize={brushSize}
              />
            )}
          </Paper>

          {/* Toolbar */}
          <ImageEditorToolbar
            backgroundColor={color}
            onColorChange={(event) => setColor(event.target.value)}
            brushSize={brushSize}
            onBrushChange={(event, value, _activeThumb) => {
              if (typeof value === 'number') {
                setBrushSize(value);
              }
            }}
            onFileReUploadChange={handleUpload}
            onSaveClick={saveImage}
            onShareClick={shareImage}
          />
        </Box>
      ) : (
        <Box
          sx={{
            width: '100%',
            height: 'calc(100svh - 64px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Paper
            sx={{
              width: '100%',
              height: 'calc(50svh - 64px)',
              mt: -5,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
            }}
            variant={'outlined'}
          >
            <Typography variant={'h5'} color={'text.secondary'}>
              There&apos;s no image to edit.
            </Typography>

            <Button
              component={'label'}
              variant={'outlined'}
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
