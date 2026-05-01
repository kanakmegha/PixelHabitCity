export type Theme = 'Scholar' | 'Athlete' | 'Zen';

export interface EvolutionStage {
  dayThreshold: number;
  assetKey: string;
  label: string;
}

export interface Blueprint {
  id: string;
  name: string;
  theme: Theme;
  habitType: string;
  evolutionStages: EvolutionStage[];
}

export interface Building {
  id: string;
  blueprintId: string;
  streak: number;
  position: { x: number; y: number };
}

export interface BuildingState {
  assetPath: string;
  label: string;
  nextStage?: EvolutionStage;
}
