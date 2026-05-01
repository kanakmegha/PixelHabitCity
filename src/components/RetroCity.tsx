'use client';

import React from 'react';

interface BuildingProps {
  stage: 1 | 2 | 3;
}

const LibraryBuilding: React.FC<BuildingProps> = ({ stage }) => {
  const color = '#60a5fa'; // Neon Blue
  return (
    <svg viewBox="0 0 100 100" className="w-24 h-24 drop-shadow-[0_0_8px_rgba(96,165,250,0.4)]">
      {/* Stage 1: Basic Outline & Dome */}
      <rect x="20" y="40" width="60" height="50" stroke={color} strokeWidth="2" fill={`${color}33`} />
      <path d="M20 40 Q50 10 80 40" stroke={color} strokeWidth="2" fill="none" />
      
      {/* Stage 2: Columns */}
      {stage >= 2 && (
        <>
          <line x1="32" y1="40" x2="32" y2="90" stroke={color} strokeWidth="2" />
          <line x1="50" y1="40" x2="50" y2="90" stroke={color} strokeWidth="2" />
          <line x1="68" y1="40" x2="68" y2="90" stroke={color} strokeWidth="2" />
        </>
      )}

      {/* Stage 3: Shelving & Entryway */}
      {stage >= 3 && (
        <>
          <line x1="20" y1="55" x2="80" y2="55" stroke={color} strokeWidth="1" opacity="0.5" />
          <line x1="20" y1="70" x2="80" y2="70" stroke={color} strokeWidth="1" opacity="0.5" />
          <rect x="42" y="75" width="16" height="15" stroke={color} strokeWidth="2" fill="#fbbf24" className="animate-pulse" />
        </>
      )}
    </svg>
  );
};

const GymBuilding: React.FC<BuildingProps> = ({ stage }) => {
  const color = '#f87171'; // Neon Red
  return (
    <svg viewBox="0 0 100 100" className="w-24 h-24 drop-shadow-[0_0_8px_rgba(248,113,113,0.4)]">
      {/* Stage 1: Sawtooth Roof & Main Frame */}
      <path d="M10 90 V40 L25 30 L40 40 L55 30 L70 40 L85 30 V90 H10" stroke={color} strokeWidth="2" fill={`${color}33`} />
      
      {/* Stage 2: Dumbbell Icon */}
      {stage >= 2 && (
        <g transform="translate(35, 55)">
          <rect x="0" y="4" width="30" height="4" fill={color} />
          <rect x="0" y="0" width="6" height="12" fill={color} />
          <rect x="24" y="0" width="6" height="12" fill={color} />
        </g>
      )}

      {/* Stage 3: Bleachers */}
      {stage >= 3 && (
        <>
          <path d="M85 90 L95 80 V50 L85 60" stroke={color} strokeWidth="2" fill="none" />
          <line x1="87" y1="80" x2="95" y2="72" stroke={color} strokeWidth="1" />
          <line x1="87" y1="70" x2="95" y2="62" stroke={color} strokeWidth="1" />
        </>
      )}
    </svg>
  );
};

const BonsaiGarden: React.FC<BuildingProps> = ({ stage }) => {
  const color = '#4ade80'; // Neon Green
  return (
    <svg viewBox="0 0 100 100" className="w-24 h-24 drop-shadow-[0_0_8px_rgba(74,222,128,0.4)]">
      {/* Stage 1: Pot & Trunk Start */}
      <rect x="20" y="75" width="60" height="15" stroke={color} strokeWidth="2" fill={`${color}33`} />
      <line x1="50" y1="75" x2="50" y2="55" stroke={color} strokeWidth="2" />

      {/* Stage 2: 45-degree Branches */}
      {stage >= 2 && (
        <>
          <path d="M50 55 L35 40" stroke={color} strokeWidth="2" />
          <path d="M50 45 L65 30" stroke={color} strokeWidth="2" />
        </>
      )}

      {/* Stage 3: Pixel Leaves */}
      {stage >= 3 && (
        <>
          <rect x="30" y="35" width="8" height="8" fill={color} />
          <rect x="62" y="25" width="8" height="8" fill={color} />
          <rect x="46" y="50" width="8" height="8" fill={color} className="animate-bounce" />
        </>
      )}
    </svg>
  );
};

interface RetroCityProps {
  habits: {
    id: string;
    type: 'library' | 'gym' | 'bonsai';
    streak: number;
  }[];
  onLevelUp?: (id: string) => void;
  canLevelUp?: boolean;
}

const RetroCity: React.FC<RetroCityProps> = ({ habits, onLevelUp, canLevelUp }) => {
  return (
    <div className="relative w-full h-[450px] bg-[#1a1b1e] overflow-hidden rounded-3xl border border-[#2c2e33] flex flex-col justify-end p-0 shadow-2xl">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      {/* Cityscape */}
      <div className="relative z-10 flex items-end justify-center gap-16 mb-16 px-12">
        {habits.map((h) => {
          const stage = h.streak >= 30 ? 3 : h.streak >= 15 ? 2 : 1;
          return (
            <div 
              key={h.id} 
              onClick={() => onLevelUp && onLevelUp(h.id)}
              className={`flex flex-col items-center group relative cursor-pointer transition-all duration-300 ${canLevelUp ? 'hover:brightness-125' : ''}`}
            >
              {/* Highlight Ring for available credits */}
              {canLevelUp && (
                <div className="absolute inset-0 -m-4 border-2 border-emerald-500/20 rounded-full animate-ping pointer-events-none" />
              )}

              <div className="transform transition-transform duration-500 group-hover:-translate-y-4">
                {h.type === 'library' && <LibraryBuilding stage={stage as any} />}
                {h.type === 'gym' && <GymBuilding stage={stage as any} />}
                {h.type === 'bonsai' && <BonsaiGarden stage={stage as any} />}
              </div>
              
              {/* Evolution Progress Bar (Mini) */}
              <div className="mt-4 w-12 h-1 bg-[#2c2e33] rounded-full overflow-hidden border border-white/5">
                <div 
                  className="h-full bg-emerald-500/50" 
                  style={{ width: `${Math.min(((h.streak % 15) / 15) * 100, 100)}%` }} 
                />
              </div>

              {/* Terminal Label */}
              <div className="mt-2 font-mono text-[8px] tracking-[0.2em] text-[#5c5f66] uppercase">
                {h.type}_sys.v{stage}
              </div>

              {/* Status HUD */}
              <div className="absolute -bottom-12 opacity-0 group-hover:opacity-100 transition-opacity bg-[#25262b] px-3 py-1.5 rounded-lg border border-[#373a40] text-[8px] text-white whitespace-nowrap z-50">
                <span className="text-[#5c5f66]">INTEGRITY:</span> {h.streak}% 
                {canLevelUp && <span className="text-emerald-500 ml-2">[CLICK_TO_ALLOCATE]</span>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Scrolling Ground Line */}
      <div className="relative h-16 w-full border-t border-[#2c2e33] bg-[#1a1b1e]/80 backdrop-blur-sm">
        <div className="absolute top-0 left-0 w-[200%] h-full flex items-center animate-scroll opacity-20">
          <div className="w-full flex justify-around">
            {[...Array(15)].map((_, i) => (
              <div key={i} className="w-8 h-[2px] bg-white/50" />
            ))}
          </div>
          <div className="w-full flex justify-around">
            {[...Array(15)].map((_, i) => (
              <div key={i} className="w-8 h-[2px] bg-white/50" />
            ))}
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none shadow-[inset_0_20px_40px_rgba(0,0,0,0.5)]" />
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 8s linear infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 0.2; }
        }
        .animate-pulse {
          animation: pulse 1s infinite;
        }
      `}</style>
    </div>
  );
};

export default RetroCity;
