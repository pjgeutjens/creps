import { writable } from 'svelte/store';
import { getRandomTestFunctions, type TestFunction } from './tests';
import { Game, type GameSettings, type Part } from './game';

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

const initialGameSettings: GameSettings = {
  ignoreSemicolon: false,
  language: 'javascript',
  duration: 60
};


export const game = writable(new Game("python"));

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



export function get_current(gameState: Game): Part {
  return gameState.sequence[gameState.position];
}

export function get_next(gameState: Game): Part {
  return gameState.sequence[gameState.position + 1];
}

export function get_at(gameState: Game, position: number): Part {
  return gameState.sequence[position];
}

export function next(gameState: Game) {
  gameState.testIndex++;
}

export function done(gameState: Game) {
  gameState.state = 'ended';
}