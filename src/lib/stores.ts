import { get, writable } from 'svelte/store';
import { Game, type gameModes, type Part } from './game';
import { persisted } from 'svelte-persisted-store';


export type GameSettings = {
  ignoreSemicolon?: boolean
  language: 'javascript'
  duration?: number
  theme: string
  mode: gameModes | undefined
};


export const gameSettings = persisted<GameSettings>('settings', { 
  ignoreSemicolon: false, 
  language: 'javascript', 
  duration: 30, 
  theme: 'nord',
  mode: 'functions'
});

export const game = writable(new Game(get(gameSettings).language, get(gameSettings).ignoreSemicolon, get(gameSettings).duration, get(gameSettings).mode));