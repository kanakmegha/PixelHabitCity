import { useEffect, useRef } from 'react';
import { EvolutionStage } from '../types/city';

/**
 * Custom hook to preload images for the next evolutionary stage.
 */
export function usePreloadAssets(nextStage?: EvolutionStage) {
  const preloadedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (nextStage && !preloadedRef.current.has(nextStage.assetKey)) {
      const assetPath = `/assets/buildings/${nextStage.assetKey}.webp`;
      
      console.log(`Preloading next stage asset: ${assetPath}`);
      
      const img = new Image();
      img.src = assetPath;
      
      img.onload = () => {
        preloadedRef.current.add(nextStage.assetKey);
        console.log(`Successfully preloaded: ${nextStage.assetKey}`);
      };
      
      img.onerror = () => {
        console.error(`Failed to preload asset: ${assetPath}`);
      };
    }
  }, [nextStage]);
}
