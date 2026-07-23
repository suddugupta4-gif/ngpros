import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Zap } from 'lucide-react';
import { MatchReportCanvas } from '@/components/MatchReportCanvas';
import templateImg from '@assets/Gemini_Generated_Image_fo78v5fo78v5fo78_1784824936063.png';

const CANVAS_WIDTH  = 1536;
const CANVAS_HEIGHT = 2752;

const boxes = {
  kills:    { cx: 425,  cy: 2045, w: 520, maxFont: 90 },
  position: { cx: 1032, cy: 2045, w: 520, maxFont: 90 },
  points:   { cx: 755,  cy: 2380, w: 700, maxFont: 100 },
};

function drawGoldText(
  ctx: CanvasRenderingContext2D,
  text: string, cx: number, cy: number, maxWidth: number, maxFont: number
) {
  if (!text) return;
  let size = maxFont;
  ctx.font = `bold ${size}px Arial, sans-serif`;
  while (ctx.measureText(text).width > maxWidth && size > 20) {
    size -= 2;
    ctx.font = `bold ${size}px Arial, sans-serif`;
  }
  ctx.save();
  ctx.textAlign    = 'center';
  ctx.textBaseline = 'middle';
  const grad = ctx.createLinearGradient(cx, cy - size / 2, cx, cy + size / 2);
  grad.addColorStop(0, '#f6d38a');
  grad.addColorStop(1, '#c99a3f');
  ctx.shadowColor   = 'rgba(0,0,0,0.6)';
  ctx.shadowBlur    = 6;
  ctx.shadowOffsetY = 3;
  ctx.lineWidth     = size * 0.06;
  ctx.strokeStyle   = 'rgba(60,35,10,0.9)';
  ctx.strokeText(text, cx, cy);
  ctx.fillStyle = grad;
  ctx.fillText(text, cx, cy);
  ctx.restore();
}

const inputCls =
  'w-full bg-[#0f0c08] border-2 border-[#3a2c18] rounded-xl text-[#f5ead0] font-bold ' +
  'font-mono text-center text-2xl focus:outline-none focus:border-[#f6d38a] ' +
  'focus:ring-2 focus:ring-[#f6d38a]/20 placeholder:text-[#2e2210] transition-all ' +
  'py-3 px-3 h-14';

export default function Home() {
  const [kills, setKills]       = useState('');
  const [position, setPosition] = useState('');
  const [points, setPoints]     = useState('');
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

  return (
    <div className="min-h-[100dvh] w-full bg-[#0d0a06] flex flex-col lg:flex-row">

      {/* ─── DESKTOP: left canvas panel (sticky, full height) ─── */}
      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center
                      lg:sticky lg:top-0 lg:h-screen p-10">
        <MatchReportCanvas kills={kills} position={position} points={points} />
      </div>

      {/* ─── MOBILE + DESKTOP right: scrollable content column ── */}
      <div className="flex flex-col lg:w-[420px] lg:min-h-screen
                      lg:border-l border-[#1e1810]">

        {/* ── Mobile-only canvas (not sticky, part of scroll flow) */}
        <div className="lg:hidden flex justify-center px-6 pt-6 pb-4">
          <MatchReportCanvas kills={kills} position={position} points={points} />
        </div>

        {/* ── Form card ───────────────────────────────────────── */}
        <div className="flex-1 flex flex-col gap-5 px-5 pt-4 pb-6
                        lg:justify-center lg:px-8 lg:py-10">

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1
              className="text-2xl font-black uppercase tracking-widest leading-none"
              style={{
                background: 'linear-gradient(180deg,#f6d38a 0%,#c99a3f 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Match Report
            </h1>
            <p className="text-[#4a3820] text-xs font-mono mt-1 tracking-widest uppercase">
              India Cup Fall 2026
            </p>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-[#f6d38a]/30 via-[#c99a3f]/10 to-transparent" />

          {/* Inputs */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
          >
            {/* Kill */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[#c99a3f]">
                Kill
              </label>
              <input
                type="number"
                min="0"
                value={kills}
                onChange={(e) => setKills(e.target.value)}
                placeholder="0"
                className={inputCls}
              />
            </div>

            {/* Position */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[#c99a3f]">
                Position
              </label>
              <input
                type="number"
                min="1"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="1"
                className={inputCls}
              />
            </div>

            {/* Total Points */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[#c99a3f]">
                Total Points
              </label>
              <input
                type="number"
                min="0"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                placeholder="0"
                className={inputCls}
              />
            </div>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-[#f6d38a]/30 via-[#c99a3f]/10 to-transparent" />

          {/* Download button */}
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleDownload}
            disabled={isDownloading}
            className="w-full h-14 rounded-xl font-black uppercase tracking-widest text-base
                       text-[#150f02] flex items-center justify-center gap-2.5
                       shadow-xl disabled:opacity-60 transition-all active:scale-95"
            style={{
              background: isDownloading
                ? '#7a5a20'
                : 'linear-gradient(180deg,#f6d38a 0%,#c99a3f 100%)',
              boxShadow: isDownloading ? 'none' : '0 4px 24px rgba(199,154,63,0.35)',
            }}
          >
            {isDownloading ? (
              <>
                <Zap className="w-5 h-5 animate-pulse" />
                Exporting…
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Download HD PNG
              </>
            )}
          </motion.button>

          {/* Resolution badge */}
          <p className="text-center text-[10px] font-mono text-[#332510] tracking-widest">
            1536 × 2752 · PNG · Full Resolution
          </p>

        </div>
      </div>
    </div>
  );
}
