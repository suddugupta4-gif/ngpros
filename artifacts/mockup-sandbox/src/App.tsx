import React, { useState } from 'react';
import { Download, Trophy, Flame } from 'lucide-react';

export default function App() {
  const [kills, setKills] = useState<number>(0);
  const [position, setPosition] = useState<number>(1);

  // Position points standard esports table calculation
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
    <div className="min-h-screen bg-[#0d0a08] text-[#f0e6d2] p-4 md:p-8 flex flex-col items-center font-sans">
      <div className="w-full max-w-md space-y-6">
        
        {/* Card Graphic Preview */}
        <div className="relative rounded-xl overflow-hidden border border-[#d4af37]/30 bg-gradient-to-b from-[#1a140e] to-[#0a0806] p-6 shadow-2xl text-center">
          
          {/* Header Badge */}
          <div className="flex justify-center mb-2">
            <div className="flex items-center gap-1 bg-[#d4af37]/10 border border-[#d4af37]/40 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">
              <Trophy className="w-3 h-3" /> India Cup Fall 2026
            </div>
          </div>

          <h2 className="text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#ffe89c] via-[#d4af37] to-[#997a15] uppercase italic">
            Match Report
          </h2>

          {/* Logo Container */}
          <div className="my-4 flex justify-center">
            <div className="w-28 h-28 border-2 border-[#d4af37]/50 rounded-lg p-2 bg-[#000]/40 flex items-center justify-center">
              <span className="text-3xl font-black text-[#d4af37] tracking-tighter">
                NONSTOP PROS
              </span>
            </div>
          </div>

          {/* Points Display Box */}
          <div className="grid grid-cols-2 gap-2 my-4 text-xs font-bold uppercase">
            <div className="bg-[#18120c] border border-[#3a2d1d] p-2 rounded">
              <span className="text-gray-400 block text-[10px]">Kill</span>
              <span className="text-lg text-white">{kills}</span>
            </div>
            <div className="bg-[#18120c] border border-[#3a2d1d] p-2 rounded">
              <span className="text-gray-400 block text-[10px]">Position</span>
              <span className="text-lg text-white">#{position}</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#2a1f13] via-[#3d2e1b] to-[#2a1f13] border border-[#d4af37]/40 p-3 rounded-lg">
            <span className="text-[10px] text-[#d4af37] tracking-widest uppercase block font-bold">Total Points</span>
            <span className="text-2xl font-black text-[#ffe89c]">{totalPoints}</span>
          </div>
        </div>

        {/* Form Controls */}
        <div className="space-y-4 bg-[#140f0a] p-5 rounded-xl border border-[#2b2014]">
          <h3 className="text-sm font-bold tracking-wider text-[#d4af37] uppercase flex items-center gap-2">
            <Flame className="w-4 h-4" /> Match Stats Input
          </h3>

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Kill Count</label>
            <input 
              type="number" 
              value={kills} 
              onChange={(e) => setKills(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full bg-[#0a0806] border border-[#3a2d1d] rounded px-3 py-2 text-center text-lg font-bold text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Position / Placement</label>
            <input 
              type="number" 
              value={position} 
              onChange={(e) => setPosition(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full bg-[#0a0806] border border-[#3a2d1d] rounded px-3 py-2 text-center text-lg font-bold text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          <div className="pt-2">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Calculated Total:</span>
              <span className="text-[#d4af37] font-bold">{totalPoints} Points</span>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <button 
          onClick={() => alert("Downloading HD PNG...")}
          className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#b38f24] text-black font-extrabold uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-[0.99] transition-all"
        >
          <Download className="w-4 h-4" /> Download HD PNG
        </button>

      </div>
    </div>
  );
        }
