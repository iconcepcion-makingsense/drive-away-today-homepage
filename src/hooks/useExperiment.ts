
import { useCallback, useEffect, useState } from 'react';
import { useGrowthBook } from '@/contexts/GrowthBookContext';

export interface ExperimentConfig {
  id: string;
  variants: string[];
  weights?: number[];  // Optional - if not provided, equal weights will be used
  persistKey?: string; // localStorage key to persist the variant assignment
}

/**
 * A generic hook to handle AB testing experiments
 * @param config The experiment configuration
 * @returns The assigned variant
 */
export const useExperiment = <T extends string>(config: ExperimentConfig): T => {
  const { id, variants, weights = [], persistKey = `experiment-${id}` } = config;
  const [variant, setVariant] = useState<T>(variants[0] as T);
  const { growthbook } = useGrowthBook();

  const normalizeWeights = useCallback((inputWeights: number[]): number[] => {
    // If weights aren't provided or are incomplete, create equal weights
    if (!inputWeights.length || inputWeights.length !== variants.length) {
      return variants.map(() => 1 / variants.length);
    }
    
    // Ensure weights sum to 1
    const sum = inputWeights.reduce((a, b) => a + b, 0);
    return sum === 1 ? inputWeights : inputWeights.map(w => w / sum);
  }, [variants]);

  useEffect(() => {
    // Check if user already has an assigned variant in localStorage
    const storedVariant = localStorage.getItem(persistKey);
    
    if (variants.includes(storedVariant as T)) {
      setVariant(storedVariant as T);
      return;
    }
    
    // Try to get variant from GrowthBook if it's ready
    if (growthbook) {
      const experiment = growthbook.getFeatureValue(id, null);
      if (experiment && variants.includes(experiment as T)) {
        setVariant(experiment as T);
        localStorage.setItem(persistKey, experiment);
        return;
      }

      // If GrowthBook doesn't have a variant for this experiment,
      // randomly assign based on provided weights
      const normalizedWeights = normalizeWeights(weights);
      const random = Math.random();
      let cumulativeWeight = 0;
      
      for (let i = 0; i < variants.length; i++) {
        cumulativeWeight += normalizedWeights[i];
        if (random < cumulativeWeight) {
          setVariant(variants[i] as T);
          localStorage.setItem(persistKey, variants[i]);
          break;
        }
      }
    }
  }, [id, variants, weights, persistKey, growthbook, normalizeWeights]);

  return variant;
};
