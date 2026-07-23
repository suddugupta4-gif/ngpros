import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Zap } from 'lucide-react';
import { MatchReportCanvas } from '@/components/MatchReportCanvas';
import templateImg from '@assets/Gemini_Generated_Image_fo78v5fo78v5fo78_1784824936063.png';

const CANVAS_WIDTH = 1536;
const CANVAS_HEIGHT = 2752;

const boxes = {
  kills:    { cx: 425,  cy: 1975, w: 520, maxFont: 90 },
  position: { cx: 1032, cy: 1975, w: 520, maxFont: 90 },
  points:   { cx: 755,  cy: 2415, w: 700, maxFont: 100 },
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
  const [kills, setKills]     = useState('');
  const [position, setPosition] = useState('');
  const [points, setPoints]   = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    await new Promise<void>((resolve) => {
      const canvas = document.createElement('canvas');
      canvas.width  = CANVAS_WIDTH;
      canvas.height = CANVAS_HEIGHT;
      const ctx = canvas.getContext('2d');
      if (!ctx) { resolve(); return; }
      const img = new Image();
      img.src = templateImg;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        drawGoldText(ctx, kills,    boxes.kills.cx,    boxes.kills.cy,    boxes.kills.w,    boxes.kills.maxFont);
        drawGoldText(ctx, position, boxes.position.cx, boxes.position.cy, boxes.position.w, boxes.position.maxFont);
        drawGoldText(ctx, points,   boxes.points.cx,   boxes.points.cy,   boxes.points.w,   boxes.points.maxFont);
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a   = document.createElement('a');
            a.href     = url;
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
    setIsDownloading(false);
  };

  const inputBase =
    'w-full bg-[#0f0c08] border border-[#4a3a22] rounded-lg text-[#f5ead0] font-bold font-mono ' +
    'text-center text-xl focus:outline-none focus:border-[#f6d38a] focus:ring-2 focus:ring-[#f6d38a]/20 ' +
    'placeholder:text-[#4a3a22] transition-all py-2 px-3';

  return (
    <div className="h-[100dvh] w-full overflow-hidden bg-[#0d0a06] flex flex-col lg:flex-row">

      {/* ── Canvas preview ──────────────────────────────────── */}
      <div className="flex items-center justify-center
                      px-4 pt-4 pb-2
                      lg:flex-1 lg:p-8 lg:h-full">
        <MatchReportCanvas kills={kills} position={position} points={points} />
      </div>

      {/* ── Controls ────────────────────────────────────────── */}
      <div className="flex flex-col justify-between
                      px-4 pb-4 pt-2 gap-3
                      lg:w-[400px] lg:h-full lg:py-8 lg:px-8 lg:justify-center lg:gap-6
                      border-t border-[#2a2015] lg:border-t-0 lg:border-l">

        {/* Heading */}
        <div className="lg:mb-2">
          <motion.h1
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl lg:text-3xl font-bold uppercase tracking-widest"
            style={{ background: 'linear-gradient(180deg,#f6d38a,#c99a3f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            Match Report
          </motion.h1>
          <p className="text-[#6b5a38] text-xs font-mono mt-0.5 tracking-wide">
            India Cup Fall 2026 — Nonstop Pros
          </p>
        </div>

        {/* Three inputs — side by side on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-3 lg:flex-col lg:gap-5"
        >
          {/* Kills */}
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-[#c99a3f] text-center lg:text-left">
              Kill
            </label>
            <input
              type="number"
              min="0"
              value={kills}
              onChange={(e) => setKills(e.target.value)}
              placeholder="0"
              className={inputBase}
            />
          </div>

          {/* Position */}
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-[#c99a3f] text-center lg:text-left">
              Position
            </label>
            <input
              type="number"
              min="1"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="1"
              className={inputBase}
            />
          </div>

          {/* Total Points */}
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-[#c99a3f] text-center lg:text-left">
              Points
            </label>
            <input
              type="number"
              min="0"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              placeholder="0"
              className={inputBase}
            />
          </div>
        </motion.div>

        {/* Download button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={handleDownload}
          disabled={isDownloading}
          whileTap={{ scale: 0.97 }}
          className="w-full rounded-xl font-bold uppercase tracking-widest text-sm lg:text-base text-[#1a1005] py-3 lg:py-4 flex items-center justify-center gap-2 shadow-lg disabled:opacity-60 transition-opacity"
          style={{ background: isDownloading ? '#8a6a2a' : 'linear-gradient(180deg,#f6d38a,#c99a3f)' }}
        >
          {isDownloading ? (
            <>
              <Zap className="w-4 h-4 animate-pulse" />
              Exporting…
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Download HD PNG
            </>
          )}
        </motion.button>

        {/* Resolution badge */}
        <p className="text-center text-[10px] font-mono text-[#4a3a22] tracking-widest lg:mt-1">
          1536 × 2752 &nbsp;·&nbsp; PNG &nbsp;·&nbsp; Full HD
        </p>

      </div>
    </div>
  );
}
