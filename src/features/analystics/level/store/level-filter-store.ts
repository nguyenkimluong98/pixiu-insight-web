import { Game } from '@/types';
import { create } from 'zustand';

export const Tabs = {
  FAIL_TO_PASS: 'fail-to-pass',
  FAIL_TO_STOP: 'fail-to-stop',
  PLAY_COUNTS: 'play-counts'
} as const;

type ActiveTab = (typeof Tabs)[keyof typeof Tabs];

export interface LevelFilterState {
  game: Game | null;
  platform: string;
  versions: string[];
  modes: string[];
  countries: string[];
  eventDay: (number | undefined)[] | undefined;
  retentionDay: number[];
  level: number[];
  isFilterReady: boolean;
  activeTab: string;
  filterVersion: number;
  setFilters: (filters: Partial<LevelFilterState>) => void;
  setFilterReady: (ready: boolean) => void;
  triggerFilter: () => void;
}

export const useLevelFilterStore = create<LevelFilterState>((set, get) => ({
  game: null,
  platform: '',
  versions: [],
  eventDay: [],
  countries: [],
  modes: [],
  retentionDay: [0, 0],
  level: [0, 0],
  isFilterReady: false,
  activeTab: Tabs.FAIL_TO_PASS,
  filterVersion: 0,
  setFilters: (filters) => set(filters),
  setFilterReady: (ready) => set({ isFilterReady: ready }),
  triggerFilter: () => set({ filterVersion: get().filterVersion + 1 })
}));
