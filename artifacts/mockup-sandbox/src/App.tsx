import React, { useState } from 'react';
import { Download } from 'lucide-react';

export default function App() {
  const [kills, setKills] = useState<number>(0);
  const [position, setPosition] = useState<number>(1);

  // Free Fire / Tournament position points standard lookup
  const getPositionPoints = (pos: number) => {
    switch (pos) {
      case 1: return 12;
      case 2: return 9;
      case 3: return 8;
      case 4: return 7;
      case 5: return 6;
      case 6: return 5;
      case 7: return 4;
      case 8: return 3;
      case 9: return 2;
      case 10: return 1;
      default: return 0;
    }
  };

  const killPoints = kills * 1;
  const positionPoints = getPositionPoints(position);
  const totalPoints = killPoints + positionPoints;

  return (
    <div className="min-h-screen bg-[#070503] text-[#e8d5b5] flex flex-col items-center py-8 px-4 font-sans selection:bg-[#d4af37] selection:text-black">
      <div className="w-full max-w-sm space-y-6">
        
        {/* Poster / Card Preview Container */}
        <div className="relative rounded-2xl overflow-hidden border border-[#d4af37]/40 bg-gradient-to-b from-[#1c150c] via-[#0f0b06] to-[#050402] p-6 shadow-[0_0_50px_rgba(212,175,55,0.15)] text-center">
          
          {/* Top Logo / Badge */}
          <div className="flex justify-center mb-3">
            <div className="flex flex-col items-center">
              <div className="w-12 h-10 bg-gradient-to-b from-[#ffe082] to-[#b38f24] [clip-path:polygon(50%_0%,_100%_25%,_100%_75%,_50%_100%,_0%_75%,_0%_25%)] flex items-center justify-center p-0.5">
                <div className="w-full h-full bg-[#0d0905] [clip-path:polygon(50%_0%,_100%_25%,_100%_75%,_50%_100%,_0%_75%,_0%_25%)] flex items-center justify-center">
                  <span className="text-[9px] font-black tracking-widest text-[#d4af37]">IFL</span>
                </div>
              </div>
              <span className="text-[10px] font-extrabold tracking-[0.2em] text-[#d4af37] mt-1 uppercase">
                India Cup <span className="text-white/60">Fall 2026</span>
              </span>
            </div>
          </div>

          {/* Main Title Header */}
          <h1 className="text-3xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#ffe89c] via-[#d4af37] to-[#997a15] uppercase italic drop-shadow-md">
            MATCH REPORT
          </h1>

          {/* Center Logo Area */}
          <div className="my-5 flex justify-center">
            <div className="w-48 h-48 rounded-xl border-2 border-[#d4af37]/60 bg-gradient-to-b from-[#21180e] to-[#0a0704] p-3 flex flex-col items-center justify-center shadow-inner relative group">
              <div className="absolute inset-0 bg-[#d4af37]/5 rounded-xl pointer-events-none" />
              
              {/* Graphic Icon / Crest Placeholder */}
              <div className="text-4xl mb-1">🐅</div>
              
              <span className="text-xl font-black text-[#ffe89c] tracking-tight uppercase italic leading-none drop-shadow">
                NONSTOP
              </span>
              <span className="text-xs font-black tracking-[0.3em] text-[#d4af37] uppercase">
                PROS
              </span>
            </div>
          </div>

          {/* Kill & Position Display Grid */}
          <div className="grid grid-cols-2 gap-3 my-4">
            <div className="bg-[#150f09] border border-[#3d2e1b] p-2.5 rounded-lg">
              <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase block">KILL</span>
              <span className="text-xl font-black text-white tracking-wider">{kills}</span>
            </div>
            <div className="bg-[#150f09] border border-[#3d2e1b] p-2.5 rounded-lg">
              <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase block">POSITION</span>
              <span className="text-xl font-black text-white tracking-wider">#{position}</span>
            </div>
          </div>

          {/* Total Points Display */}
          <div className="bg-gradient-to-r from-[#291f13] via-[#42321c] to-[#291f13] border border-[#d4af37]/50 p-3 rounded-xl shadow-lg">
            <span className="text-[10px] font-black text-[#d4af37] tracking-[0.2em] uppercase block mb-0.5">
              TOTAL POINTS
            </span>
            <span className="text-3xl font-black text-[#fff2c6] tracking-tight drop-shadow">
              {totalPoints}
            </span>
          </div>
        </div>

        {/* Input Controls Panel */}
        <div className="bg-[#120d08] border border-[#2d2012] rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="border-b border-[#2d2012] pb-2">
            <h2 className="text-xs font-black tracking-[0.2em] text-[#d4af37] uppercase">
              MATCH REPORT
            </h2>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
              INDIA CUP FALL 2026
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-[10px] font-extrabold tracking-widest text-gray-400 uppercase mb-1">
                KILL
              </label>
              <input
                type="number"
                value={kills}
                onChange={(e) => setKills(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-[#090604] border border-[#382a1a] rounded-lg px-4 py-2.5 text-center text-lg font-black text-white focus:outline-none focus:border-[#d4af37] transition-all"
              />
            </div>

            <div>
              <label className="block text-[10px] font-extrabold tracking-widest text-gray-400 uppercase mb-1">
                POSITION
              </label>
              <input
                type="number"
                value={position}
                onChange={(e) => setPosition(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full bg-[#090604] border border-[#382a1a] rounded-lg px-4 py-2.5 text-center text-lg font-black text-white focus:outline-none focus:border-[#d4af37] transition-all"
              />
            </div>

            <div>
              <label className="block text-[10px] font-extrabold tracking-widest text-gray-400 uppercase mb-1">
                TOTAL POINTS
              </label>
              <div className="w-full bg-[#090604]/50 border border-[#231a10] rounded-lg px-4 py-2.5 text-center text-lg font-black text-[#d4af37]/80">
                {totalPoints}
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => alert("Downloading HD PNG Match Report...")}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f5e7b2] to-[#b38f24] text-black font-black uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
        >
          <Download className="w-5 h-5 stroke-[2.5]" /> DOWNLOAD HD PNG
        </button>

        <p className="text-[10px] text-center text-gray-600 font-bold uppercase tracking-widest">
          1536 × 2752 • PNG • Full Resolution
        </p>

      </div>
    </div>
  );
        }
