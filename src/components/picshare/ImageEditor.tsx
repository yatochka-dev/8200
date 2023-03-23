import React, { useRef, useState, useEffect, MouseEvent } from 'react';

interface ImageEditorProps {
  file: File;
}

interface DrawCoordinates {
  x: number;
  y: number;
}

const ImageEditor: React.FC<ImageEditorProps> = ({ file }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);

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

  const saveImage = () => {
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL();
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'edited-image.png';
      link.click();
    }
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseOut={finishDrawing}
        onMouseMove={draw}
      />
      <div>
        <input
          type="color"
          value={color}
          onChange={(event) => setColor(event.target.value)}
        />
        <input
          type="range"
          min="1"
          max="20"
          value={brushSize}
          onChange={(event) => setBrushSize(parseInt(event.target.value))}
        />
      </div>
      <button onClick={saveImage}>Save Image</button>
    </div>
  );
};

export default ImageEditor;