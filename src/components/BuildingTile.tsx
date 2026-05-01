'use client';

import React, { useMemo } from 'react';
import { getBuildingState } from '../utils/cityEngine';
import { usePreloadAssets } from '../hooks/usePreloadAssets';

interface BuildingTileProps {
  blueprintId?: string;
  streak: number;
}

const BuildingTile: React.FC<BuildingTileProps> = ({ blueprintId, streak }) => {
  const buildingState = useMemo(() => {
    if (!blueprintId) return null;
    return getBuildingState(streak, blueprintId);
  }, [blueprintId, streak]);

  // Preload the next stage
  usePreloadAssets(buildingState?.nextStage);

  if (!blueprintId || !buildingState) {
    return (
      <div className="w-full h-full bg-green-900/20 border border-green-500/10 rounded-sm" />
    );
  }

  return (
    <div className="relative w-full h-full group flex items-center justify-center">
      {/* Dynamic Floor Shadow */}
      <div className="absolute -bottom-4 w-12 h-6 bg-black/40 blur-xl rounded-full scale-x-150 transform -rotate-x-60 opacity-60 transition-all duration-300 group-hover:scale-x-125 group-hover:opacity-80" />
      
      {/* Building Asset Container */}
      <div className="relative transition-all duration-500 transform group-hover:-translate-y-4 group-hover:scale-110">
        <img 
          src={buildingState.assetPath} 
          alt={buildingState.label} 
          className="w-32 h-32 object-contain filter drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)]"
          onError={(e) => {
            // Fallback to a 3D block if image fails to load
            e.currentTarget.style.display = 'none';
            e.currentTarget.nextElementSibling?.classList.remove('hidden');
          }}
        />
        {/* Placeholder 3D Block */}
        <div className="hidden w-20 h-20 bg-gradient-to-tr from-slate-800 via-slate-600 to-slate-400 rounded-lg shadow-2xl flex items-center justify-center text-[10px] text-white p-2 text-center font-bold border border-white/20">
           {buildingState.label}
        </div>
      </div>

      {/* Floating Label / Level Badge */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-slate-900/90 backdrop-blur-md text-emerald-400 text-[10px] py-1.5 px-3 rounded-full border border-emerald-500/30 whitespace-nowrap z-50 pointer-events-none shadow-glow">
        <span className="font-bold text-white mr-1">{buildingState.label}</span>
        <span className="text-emerald-500/80">Lvl {Math.floor(streak / 7) + 1}</span>
      </div>
    </div>
  );
};

export default BuildingTile;
