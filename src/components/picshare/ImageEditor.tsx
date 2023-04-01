import React, { MouseEvent, useEffect, useRef, useState } from 'react';
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

  const startDrawing = (clientX: number, clientY: number) => {
    setDrawing(true);
    draw(clientX, clientY);
  };

  const finishDrawing = () => {
    setDrawing(false);
    if (context) {
      context.beginPath();
    }
  };

  const draw = (clientX: number, clientY: number) => {
    if (!drawing || !context || !canvasRef.current) return;

    const canvasPosition = canvasRef.current.getBoundingClientRect();
    const scaleFactor = canvasRef.current.width / canvasPosition.width;

    const coordinates: DrawCoordinates = {
      x: (clientX - canvasPosition.left) * scaleFactor,
      y: (clientY - canvasPosition.top) * scaleFactor,
    };

    context.lineWidth = brushSize;
    context.lineCap = 'round';
    context.strokeStyle = color;

    context.lineTo(coordinates.x, coordinates.y);
    context.stroke();

    context.beginPath();
    context.moveTo(coordinates.x, coordinates.y);
  };

  const handleMouseDown = (event: MouseEvent) => {
    startDrawing(event.clientX, event.clientY);
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    const touch = event.touches[0];
    if (!touch) return;
    startDrawing(touch.clientX, touch.clientY);
  };

  return (
    <Box
      sx={{
        maxWidth: '100%',
        maxHeight: '100%',
      }}
    >
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseUp={finishDrawing}
        onMouseOut={finishDrawing}
        onMouseMove={(e) => draw(e.clientX, e.clientY)}
        onTouchStart={handleTouchStart}
        onTouchEnd={finishDrawing}
        onTouchCancel={finishDrawing}
        onTouchMove={(e) => {
          e.preventDefault();
          const touch = e.touches[0];
          if (!touch) return;
          draw(touch.clientX, touch.clientY);
        }}
        style={{ maxWidth: '100%', maxHeight: '100%' }}
      />
    </Box>
  );
};

export default ImageEditor;
