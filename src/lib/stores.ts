import { get, writable } from 'svelte/store';
import { Game, type Part } from './game';
import { persisted } from 'svelte-persisted-store';


export type GameSettings = {
  ignoreSemicolon?: boolean
  language?: string
  duration?: number
  theme?: string
};


export const gameSettings = persisted('settings', { 
  ignoreSemicolon: false, 
  language: 'golang', 
  duration: 30, 
  theme: 'nord'
});

export const game = writable(new Game("javascript", get(gameSettings).ignoreSemicolon, get(gameSettings).duration));



export function get_current(gameState: Game): Part {
  return gameState.sequence[gameState.position];
}

export function get_next(gameState: Game): Part {
  return gameState.sequence[gameState.position + 1];
}

export function get_at(gameState: Game, position: number): Part | null{
  if (position >= gameState.sequence.length || position <= 0) {
    return null;
  }
  return gameState.sequence[position];
}

export function next(gameState: Game) {
  gameState.testIndex++;
}

export function done(gameState: Game) {
  gameState.state = 'ended';
}