import { Blueprint } from '../types/city';

export const BLUEPRINTS: Blueprint[] = [
  {
    id: 'great-library',
    name: 'The Great Library',
    theme: 'Scholar',
    habitType: 'Reading',
    evolutionStages: [
      { dayThreshold: 0, assetKey: 'library_s1', label: 'Simple Desk' },
      { dayThreshold: 3, assetKey: 'library_s2', label: 'Study Corner' },
      { dayThreshold: 7, assetKey: 'library_s3', label: 'Book Nook' },
      { dayThreshold: 14, assetKey: 'library_s4', label: 'The Great Library' },
    ],
  },
  {
    id: 'bonsai-garden',
    name: 'The Bonsai Garden',
    theme: 'Zen',
    habitType: 'Meditation',
    evolutionStages: [
      { dayThreshold: 0, assetKey: 'garden_s1', label: 'Lone Seed' },
      { dayThreshold: 5, assetKey: 'garden_s2', label: 'Sapling' },
      { dayThreshold: 10, assetKey: 'garden_s3', label: 'Pruned Bonsai' },
      { dayThreshold: 21, assetKey: 'garden_s4', label: 'The Bonsai Garden' },
    ],
  },
  {
    id: 'power-stadium',
    name: 'The Power Stadium',
    theme: 'Athlete',
    habitType: 'Gym',
    evolutionStages: [
      { dayThreshold: 0, assetKey: 'stadium_s1', label: 'Weights Rack' },
      { dayThreshold: 7, assetKey: 'stadium_s2', label: 'Training Ground' },
      { dayThreshold: 15, assetKey: 'stadium_s3', label: 'Local Arena' },
      { dayThreshold: 30, assetKey: 'stadium_s4', label: 'The Power Stadium' },
    ],
  },
];
