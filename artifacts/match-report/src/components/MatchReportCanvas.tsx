import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import templateImg from '@assets/Gemini_Generated_Image_fo78v5fo78v5fo78_1784824936063.png';

interface MatchReportCanvasProps {
  kills: string;
  position: string;
  points: string;
}

const CANVAS_WIDTH = 1536;
const CANVAS_HEIGHT = 2752;

const boxes = {
  kills: { cx: 425, cy: 1975, w: 520, maxFont: 90 },
  position: { cx: 1032, cy: 1975, w: 520, maxFont: 90 },
  points: { cx: 755, cy: 2415, w: 700, maxFont: 100 },
};

function drawGoldText(
  ctx: CanvasRenderingContext2D,
  text: string,
  cx: number,
  cy: number,
  maxWidth: number,
  maxFont: number
) {
  if (!text) return;
  
  let size = maxFont;
  ctx.font = `bold ${size}px Arial, sans-serif`;
  
  while (ctx.measureText(text).width > maxWidth && size > 20) {
    size -= 2;
    ctx.font = `bold ${size}px Arial, sans-serif`;
  }
  
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  const grad = ctx.createLinearGradient(cx, cy - size / 2, cx, cy + size / 2);
  grad.addColorStop(0, '#f6d38a');
  grad.addColorStop(1, '#c99a3f');
  
  ctx.shadowColor = 'rgba(0,0,0,0.6)';
  ctx.shadowBlur = 6;
  ctx.shadowOffsetY = 3;
  
  ctx.lineWidth = size * 0.06;
  ctx.strokeStyle = 'rgba(60,35,10,0.9)';
  ctx.strokeText(text, cx, cy);
  
  ctx.fillStyle = grad;
  ctx.fillText(text, cx, cy);
  
  ctx.restore();
}

export function MatchReportCanvas({ kills, position, points }: MatchReportCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = templateImg;
    img.onload = () => {
      imageRef.current = img;
      redraw();
    };
  }, []);

  useEffect(() => {
    redraw();
  }, [kills, position, points]);

  const redraw = () => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    drawGoldText(ctx, kills, boxes.kills.cx, boxes.kills.cy, boxes.kills.w, boxes.kills.maxFont);
    drawGoldText(ctx, position, boxes.position.cx, boxes.position.cy, boxes.position.w, boxes.position.maxFont);
    drawGoldText(ctx, points, boxes.points.cx, boxes.points.cy, boxes.points.w, boxes.points.maxFont);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="relative w-full h-full flex items-center justify-center"
    >
      <div className="relative" style={{ aspectRatio: `${CANVAS_WIDTH}/${CANVAS_HEIGHT}` }}>
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="w-full h-full shadow-2xl"
          style={{ maxHeight: '85vh' }}
          data-testid="canvas-preview"
        />
      </div>
    </motion.div>
  );
}
