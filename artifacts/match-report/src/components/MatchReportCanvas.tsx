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

  const redraw = (k: string, pos: string, pts: string) => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    drawGoldText(ctx, k, boxes.kills.cx, boxes.kills.cy, boxes.kills.w, boxes.kills.maxFont);
    drawGoldText(ctx, pos, boxes.position.cx, boxes.position.cy, boxes.position.w, boxes.position.maxFont);
    drawGoldText(ctx, pts, boxes.points.cx, boxes.points.cy, boxes.points.w, boxes.points.maxFont);
  };

  useEffect(() => {
    const img = new Image();
    img.src = templateImg;
    img.onload = () => {
      imageRef.current = img;
      redraw(kills, position, points);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (imageRef.current) {
      redraw(kills, position, points);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kills, position, points]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-center w-full"
    >
      {/* Constrain height: compact on mobile, taller on desktop */}
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="shadow-2xl rounded-sm"
        style={{
          maxHeight: 'min(50vh, 90vw * 1.79)',
          width: 'auto',
          height: 'auto',
          maxWidth: '100%',
          display: 'block',
        }}
        data-testid="canvas-preview"
      />
    </motion.div>
  );
}
