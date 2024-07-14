import { CharacterState, type GameSettings, type Part } from '$lib/game';
import { writable } from 'svelte/store';
import { getRandomTestFunctions, type TestFunction } from './tests';

// Custom store that syncs with local storage
function createLocalStorageStore(key: string, initial: GameSettings) {
  const { subscribe, set, update } = writable(initial);

  return {
    subscribe,
    set: (value: GameSettings) => {
      localStorage.setItem(key, JSON.stringify(value));
      set(value);
    },
    update
  };
}

export const gameSettings = createLocalStorageStore('codereps-settings', { ignoreSemicolon: false, language: 'golang', duration: 30 });

type GameStats = {
  wordCount: number;
  charCount: number;
  wordsPerMinute: number;
  accuracy: number;
  active: boolean;
  ended: boolean;
  next: string[];
};

type Game = {
  position: number;
  tests: TestFunction[];
  testIndex: number;
  state: 'active' | 'ended' | 'paused';
  sequence: Part[];
  history: string[];
  settings: GameSettings;
  letter_count: number;
  word_count: number;
  start_time: number | null;
  end_time: number | null;
  error_pos: Set<number>;
  was_skipped: boolean;
  first: boolean;
  timeElapsed: number;
  accuracy: number;
  wpm: number;
}

let tests = getRandomTestFunctions('javascript', 4);

export const game = writable<Game>({
  position: 0,
  tests: tests,
  testIndex: 0,
  state: 'paused',
  sequence: Array.from(tests[0].content.trim()).map((character: string) => ({
    character,
    state: CharacterState.REMAINING,
  })),
  history: [],
  settings: {
    ignoreSemicolon: false,
    language: 'javascript',
    duration: 30
  },
  letter_count: 0,
  word_count: 0,
  start_time: null,
  end_time: null,
  error_pos: new Set<number>,
  was_skipped: false,
  first: true,
  timeElapsed: 0,
  accuracy: 100,
  wpm: 0
});

export function get_current(gameState: Game): Part {
  return gameState.sequence[gameState.position];
}

export function get_next(gameState: Game): Part {
  return gameState.sequence[gameState.position + 1];
}

export function get_at(gameState: Game, position: number): Part {
  return gameState.sequence[position];
}

// Function to update stats
export function update(newStatus: Game) {
  game.update(current => {
    return { ...current, ...newStatus };
  });
}