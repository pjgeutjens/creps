  import type { Game } from '$lib/game';
import { writable } from 'svelte/store';

  type GameSettings = { 
    ignoreSemicolon: boolean 
    language: string
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

  export const gameSettings = createLocalStorageStore('codereps-settings', {ignoreSemicolon: false, language: 'javascript'});

  type GameStats = {
    wordCount: number;
    charCount: number;
    wordsPerMinute: number;
    accuracy: number;
  };

  export const stats = writable<GameStats>({
    wordCount: 0,
    charCount: 0,
    wordsPerMinute: 0,
    accuracy: 0,
  });

  // Function to update stats
  export function updateStats(newStats: GameStats) {
    stats.update(currentStats => {
      return { ...currentStats, ...newStats };
    });
  }