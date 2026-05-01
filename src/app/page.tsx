'use client';

import React, { useState, useEffect } from 'react';
import RetroCity from '../components/RetroCity';

interface Building {
  id: string;
  type: 'library' | 'gym' | 'bonsai';
  points: number;
}

export default function HabitCity() {
  const [habits, setHabits] = useState([
    { id: 'h1', name: 'Deep Coding Session', completed: false },
  ]);

  const [buildings, setBuildings] = useState<Building[]>([
    { id: 'b1', type: 'library' as const, points: 8 },
  ]);

  const [availablePoints, setAvailablePoints] = useState(5);
  const [newHabitName, setNewHabitName] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Load from LocalStorage on Mount
  useEffect(() => {
    const savedHabits = localStorage.getItem('pixel_habits');
    const savedBuildings = localStorage.getItem('pixel_buildings');
    const savedPoints = localStorage.getItem('pixel_points');

    if (savedHabits) setHabits(JSON.parse(savedHabits));
    if (savedBuildings) setBuildings(JSON.parse(savedBuildings));
    if (savedPoints) setAvailablePoints(parseInt(savedPoints));
    
    setIsLoaded(true);
  }, []);

  // 2. Save to LocalStorage on Change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('pixel_habits', JSON.stringify(habits));
      localStorage.setItem('pixel_buildings', JSON.stringify(buildings));
      localStorage.setItem('pixel_points', availablePoints.toString());
    }
  }, [habits, buildings, availablePoints, isLoaded]);

  if (!isLoaded) return <div className="min-h-screen bg-[#1a1b1e] flex items-center justify-center font-mono text-emerald-500">INITIALIZING_ENGINE...</div>;

  const addHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;
    setHabits([...habits, { id: `h-${Date.now()}`, name: newHabitName, completed: false }]);
    setNewHabitName('');
  };

  const addBuilding = (type: 'library' | 'gym' | 'bonsai') => {
    if (availablePoints >= 5) {
      setBuildings([...buildings, { id: `b-${Date.now()}`, type, points: 0 }]);
      setAvailablePoints(p => p - 5);
    }
  };

  const completeHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === id && !h.completed) {
          setAvailablePoints((p) => p + 1);
          return { ...h, completed: true };
        }
        return h;
      })
    );
    setTimeout(() => {
      setHabits(prev => prev.map(h => h.id === id ? { ...h, completed: false } : h));
    }, 2000);
  };

  const allocateGrowth = (buildingId: string) => {
    if (availablePoints > 0) {
      setBuildings((prev) =>
        prev.map((b) => (b.id === buildingId ? { ...b, points: b.points + 1 } : b))
      );
      setAvailablePoints((p) => p - 1);
    }
  };

  return (
    <main className="min-h-screen bg-[#1a1b1e] text-[#e8eaed] p-8 font-mono">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 flex justify-between items-end border-b border-[#2c2e33] pb-8">
          <div>
            <h1 className="text-2xl font-black tracking-[0.3em] uppercase text-white">
              City Architect <span className="text-emerald-500">v2.1</span>
            </h1>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-[#5c5f66] mb-1 uppercase tracking-widest">Available Credits</div>
            <div className="text-3xl font-bold text-emerald-500">{availablePoints}</div>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Panel: Management */}
          <div className="space-y-12">
            {/* 1. Habit Management */}
            <section>
              <h2 className="text-[10px] uppercase tracking-[0.4em] text-[#5c5f66] font-black mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full" />
                Habit Terminal
              </h2>
              <form onSubmit={addHabit} className="flex gap-2 mb-6">
                <input 
                  type="text" 
                  value={newHabitName}
                  onChange={(e) => setNewHabitName(e.target.value)}
                  placeholder="NEW_HABIT..."
                  className="bg-[#25262b] border border-[#2c2e33] text-[10px] px-3 py-2 rounded flex-1 focus:border-blue-500 outline-none"
                />
                <button className="bg-blue-600 px-4 py-2 rounded text-[10px] font-bold">+</button>
              </form>
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                {habits.map((h) => (
                  <div key={h.id} className="p-4 bg-[#25262b] border border-[#2c2e33] rounded-xl flex justify-between items-center group">
                    <span className="text-[10px] font-bold uppercase">{h.name}</span>
                    <button 
                      onClick={() => completeHabit(h.id)}
                      className="opacity-0 group-hover:opacity-100 bg-white/5 border border-white/10 px-3 py-1 rounded text-[8px] hover:bg-emerald-500 hover:text-white transition-all"
                    >
                      EXECUTE
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* 2. District Commissioning */}
            <section>
              <h2 className="text-[10px] uppercase tracking-[0.4em] text-[#5c5f66] font-black mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full" />
                Construct New District
              </h2>
              <div className="grid grid-cols-3 gap-2">
                {['library', 'gym', 'bonsai'].map((t) => (
                  <button 
                    key={t}
                    onClick={() => addBuilding(t as any)}
                    disabled={availablePoints < 5}
                    className={`p-3 rounded border text-[8px] font-bold uppercase transition-all ${
                      availablePoints >= 5 
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-500 hover:bg-amber-500 hover:text-white' 
                      : 'bg-[#2c2e33] border-[#373a40] text-[#5c5f66] cursor-not-allowed'
                    }`}
                  >
                    {t} (5c)
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Engine View */}
          <div className="lg:col-span-2 space-y-8">
            <RetroCity 
              habits={buildings.map(b => ({ id: b.id, type: b.type, streak: b.points }))} 
              onLevelUp={allocateGrowth}
              canLevelUp={availablePoints > 0}
            />
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
               {buildings.map(b => {
                 const stage = b.points >= 30 ? 3 : b.points >= 15 ? 2 : 1;
                 const nextThreshold = stage === 1 ? 15 : 30;
                 const progress = Math.min((b.points / nextThreshold) * 100, 100);
                 
                 return (
                   <div key={b.id} className="bg-[#25262b] p-4 rounded-xl border border-[#2c2e33]">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[9px] text-white font-bold uppercase">{b.type}</span>
                        <span className="text-[8px] text-[#5c5f66] uppercase">lvl {stage}</span>
                      </div>
                      
                      {/* Evolution Progress Bar */}
                      <div className="h-1.5 bg-[#1a1b1e] rounded-full overflow-hidden mb-4 border border-white/5">
                        <div 
                          className="h-full bg-emerald-500 transition-all duration-500" 
                          style={{ width: `${progress}%` }} 
                        />
                      </div>

                      <button 
                        onClick={() => allocateGrowth(b.id)}
                        disabled={availablePoints === 0}
                        className={`w-full py-2 rounded text-[9px] font-black transition-all ${
                          availablePoints > 0 
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white' 
                          : 'bg-[#2c2e33] text-[#5c5f66] cursor-not-allowed'
                        }`}
                      >
                        {availablePoints > 0 ? `EVOLVE (+${b.points}/${nextThreshold})` : `${b.points}/${nextThreshold} XP`}
                      </button>
                   </div>
                 );
               })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
