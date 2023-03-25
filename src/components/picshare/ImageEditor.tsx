import React, { type MouseEvent, useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';

interface ImageEditorProps {
  file: File;
  color: string;
  brushSize: number;
  onChange: (canvas: HTMLCanvasElement) => void;
}

interface DrawCoordinates {
  x: number;
  y: number;
}

const ImageEditor: React.FC<ImageEditorProps> = ({
  file,
  onChange,
  color,
  brushSize,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvasContext = canvasRef.current.getContext('2d');
      setContext(canvasContext);

      const reader = new FileReader();
      reader.onload = (event) => {
        const image = new Image();
        image.src = event.target?.result as string;
        image.onload = () => {
          if (canvasContext && canvasRef.current) {
            canvasRef.current.width = image.width;
            canvasRef.current.height = image.height;
            canvasContext.drawImage(image, 0, 0);
          }
        };
      };

      reader.readAsDataURL(file);
    }
  }, [file]);

  useEffect(() => {
    if (canvasRef.current) {
      onChange(canvasRef.current);
    }
  }, [canvasRef.current, onChange]);

  const startDrawing = (event: MouseEvent) => {
    setDrawing(true);
    draw(event);
  };

  const finishDrawing = () => {
    setDrawing(false);
    if (context) {
      context.beginPath();
    }
  };

  const draw = (event: MouseEvent) => {
    if (!drawing || !context) return;

    const canvasPosition = canvasRef.current?.getBoundingClientRect();
    if (!canvasPosition) return;

    const coordinates: DrawCoordinates = {
      x: event.clientX - canvasPosition.left,
      y: event.clientY - canvasPosition.top,
    };

    context.lineWidth = brushSize;
    context.lineCap = 'round';
    context.strokeStyle = color;

    context.lineTo(coordinates.x, coordinates.y);
    context.stroke();

    context.beginPath();
    context.moveTo(coordinates.x, coordinates.y);
  };

  return (
    <Box
      sx={{
        maxWidth: '100%',
        aspectRatio: '16 / 9',
        overflowX: 'auto',
      }}
    >
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseOut={finishDrawing}
        onMouseMove={draw}
        style={{ aspectRatio: '16 / 9' }}
      />
    </Box>
  );
};

export default ImageEditor;
