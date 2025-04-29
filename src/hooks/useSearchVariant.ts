
import { useExperiment, ExperimentConfig } from './useExperiment';

type SearchVariant = 'default' | 'separate-dates';

// Configuration for the search panel experiment
const searchPanelExperiment: ExperimentConfig = {
  id: 'search-panel-variant',
  variants: ['default', 'separate-dates'],
  weights: [0.5, 0.5],
  persistKey: 'search-variant'
};

/**
 * Hook to get the assigned search panel variant
 * @returns The assigned variant ('default' or 'separate-dates')
 */
export const useSearchVariant = (): SearchVariant => {
  return useExperiment<SearchVariant>(searchPanelExperiment);
};
