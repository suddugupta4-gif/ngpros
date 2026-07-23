import { useState } from 'react';
import { MatchReportCanvas } from '@/components/MatchReportCanvas';
import { ControlPanel } from '@/components/ControlPanel';
import templateImg from '@assets/Gemini_Generated_Image_fo78v5fo78v5fo78_1784824936063.png';

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

export default function Home() {
  const [kills, setKills] = useState('');
  const [position, setPosition] = useState('');
  const [points, setPoints] = useState('');

  const handleDownload = () => {
    return new Promise<void>((resolve) => {
      const canvas = document.createElement('canvas');
      canvas.width = CANVAS_WIDTH;
      canvas.height = CANVAS_HEIGHT;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        resolve();
        return;
      }

      const img = new Image();
      img.src = templateImg;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        drawGoldText(ctx, kills, boxes.kills.cx, boxes.kills.cy, boxes.kills.w, boxes.kills.maxFont);
        drawGoldText(ctx, position, boxes.position.cx, boxes.position.cy, boxes.position.w, boxes.position.maxFont);
        drawGoldText(ctx, points, boxes.points.cx, boxes.points.cy, boxes.points.w, boxes.points.maxFont);

        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `match-report-k${kills || '0'}-p${position || '0'}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }
          resolve();
        }, 'image/png');
      };
    });
  };

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Subtle grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.02] z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Desktop: side-by-side. Mobile: stacked, scrollable */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:min-h-screen">

        {/* Canvas preview — takes up reasonable space on mobile, half screen on desktop */}
        <div className="w-full lg:flex-1 flex items-center justify-center p-4 lg:p-8 lg:sticky lg:top-0 lg:h-screen">
          <MatchReportCanvas kills={kills} position={position} points={points} />
        </div>

        {/* Control panel — full width below on mobile, sidebar on desktop */}
        <div className="w-full lg:w-[420px] lg:min-h-screen flex items-start lg:items-center justify-center bg-card/50 backdrop-blur-sm border-t lg:border-t-0 lg:border-l border-border py-6 lg:py-8">
          <ControlPanel
            kills={kills}
            position={position}
            points={points}
            onKillsChange={setKills}
            onPositionChange={setPosition}
            onPointsChange={setPoints}
            onDownload={handleDownload}
          />
        </div>

      </div>
    </div>
  );
}
