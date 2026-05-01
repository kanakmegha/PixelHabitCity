import { BLUEPRINTS } from '../data/blueprints';
import { BuildingState, EvolutionStage } from '../types/city';

/**
 * Returns the current building state based on the streak count and blueprint ID.
 */
export function getBuildingState(streakCount: number, blueprintId: string): BuildingState {
  const blueprint = BLUEPRINTS.find((b) => b.id === blueprintId);
  
  if (!blueprint) {
    throw new Error(`Blueprint with ID ${blueprintId} not found.`);
  }

  // Sort stages by threshold descending to find the highest reached threshold
  const reachedStages = [...blueprint.evolutionStages]
    .sort((a, b) => b.dayThreshold - a.dayThreshold)
    .filter((stage) => streakCount >= stage.dayThreshold);

  const currentStage = reachedStages[0] || blueprint.evolutionStages[0];
  
  // Find the next stage for preloading
  const nextStage = blueprint.evolutionStages
    .sort((a, b) => a.dayThreshold - b.dayThreshold)
    .find((stage) => stage.dayThreshold > streakCount);

  return {
    assetPath: `/assets/buildings/${currentStage.assetKey}.webp`,
    label: currentStage.label,
    nextStage: nextStage,
  };
}
