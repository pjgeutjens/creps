import { writable } from 'svelte/store';
import { Game, type Part } from './game';
import { persisted } from 'svelte-persisted-store';


export type GameSettings = {
  ignoreSemicolon?: boolean
  language?: string
  duration?: number
  theme?: string
};

export const game = writable(new Game("python"));

export const gameSettings = persisted('settings', { 
  ignoreSemicolon: false, 
  language: 'golang', 
  duration: 30, 
  theme: 'nord'
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

export function next(gameState: Game) {
  gameState.testIndex++;
}

export function done(gameState: Game) {
  gameState.state = 'ended';
}