'use client';

import React from 'react';
import BuildingTile from './BuildingTile';
import { Building } from '../types/city';

interface CityGridProps {
  buildings: Building[];
}

const CityGrid: React.FC<CityGridProps> = ({ buildings }) => {
  // Create a 5x5 grid map
  const grid = Array.from({ length: 5 }, (_, y) =>
    Array.from({ length: 5 }, (_, x) => {
      return buildings.find((b) => b.position.x === x && b.position.y === y);
    })
  );

  return (
    <div className="flex items-center justify-center min-h-[600px] w-full overflow-hidden bg-slate-950">
      {/* Isometric Container */}
      <div 
        className="relative grid grid-cols-5 gap-4 p-8"
        style={{
          transform: 'rotateX(60deg) rotateZ(45deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        {grid.map((row, y) =>
          row.map((building, x) => (
            <div
              key={`${x}-${y}`}
              className="group relative w-24 h-24 transition-all duration-300"
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* The 3D Slab/Voxel Tile */}
              <div className="absolute inset-0 bg-emerald-800/80 border border-emerald-400/30 rounded-sm shadow-[0_0_20px_rgba(52,211,153,0.1)] transition-colors group-hover:bg-emerald-700">
                {/* Top Face (already the div itself) */}
                
                {/* Right Side */}
                <div className="absolute top-0 -right-[10px] w-[10px] h-full bg-emerald-900 origin-left skew-y-[45deg]" />
                
                {/* Bottom Side */}
                <div className="absolute -bottom-[10px] left-0 w-full h-[10px] bg-emerald-950 origin-top skew-x-[45deg]" />
              </div>

              {/* Coordinate Label */}
              <span className="absolute -bottom-2 -right-2 text-[8px] text-white/10 select-none transform translate-z-10">
                {x},{y}
              </span>

              {/* Building Rendering - Projected Vertically */}
              <div 
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{
                  transform: 'rotateZ(-45deg) rotateX(-60deg) translateZ(40px)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <BuildingTile 
                  blueprintId={building?.blueprintId} 
                  streak={building?.streak || 0} 
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CityGrid;
