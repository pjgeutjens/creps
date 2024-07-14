  import type { Game } from '$lib/game';
import { writable } from 'svelte/store';

  type GameSettings = { 
    ignoreSemicolon: boolean 
    language: string
    duration: number
  };

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

  export const gameSettings = createLocalStorageStore('codereps-settings', {ignoreSemicolon: false, language: 'golang', duration: 30}); 

  type GameStats = {
    wordCount: number;
    charCount: number;
    wordsPerMinute: number;
    accuracy: number;
    active: boolean;
    ended: boolean;
    next: string[];
  };

  export const gameStats = writable<GameStats>({
    wordCount: 0,
    charCount: 0,
    wordsPerMinute: 0,
    accuracy: 0,
    active: false,
    ended: false,
    next: []
  });

  // Function to update stats
  export function updateStats(newStats: GameStats) {
    gameStats.update(currentStats => {
      return { ...currentStats, ...newStats };
    });
  }