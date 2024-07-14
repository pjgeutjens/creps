import type { TestFunction } from "./tests";

export enum CharacterState {
    REMAINING = "remaining",
    INCORRECT = "incorrect",
    CORRECT = "correct",
    SKIPPED = "skipped",
    SEMI = "semi",
}

export type Part = {
    character: string;
    state: CharacterState;
};

type GameSettings = {
    ignoreSemicolon: boolean;
};

export type GameState = {
    position: number;
    sequence: Part[];
    next: string[];
    get_current: () => Part;
    get_next: () => Part;
    get_at: (position: number) => Part;
    letter_count: number,
    word_count: number,
    start_time: number | null,
    done: () => void,
    error_pos: Set<number>,
    was_skipped: false,
    first: true,
    duration: number,
    accuracy: number,
    wpm: number,
};

export class Game {
    position: number;
    sequence: Part[];
    next: string[];
    settings: GameSettings;
    letter_count: number;
    word_count: number;
    start_time: number | null;
    error_pos: Set<number>;
    was_skipped: boolean;
    first: boolean;
    duration: number;
    timeElapsed: number;
    accuracy: number;
    wpm: number;

    constructor(tests:TestFunction[], duration: number = 30, settings: GameSettings | null = null) {
        this.settings = settings ? settings : { ignoreSemicolon: false };
        this.position = 0;
        this.sequence = Array.from(tests[0].content.trim()).map((character: string) => ({
            character,
            state: CharacterState.REMAINING,
        }));
        this.next = tests.slice(1).map((t) => t.content);
        this.error_pos = new Set();
        this.letter_count = 0;
        this.word_count = 0;
        this.start_time = new Date().getTime();
        this.was_skipped = false;

        this.first = true;
        this.duration = duration;
        this.timeElapsed = 0;
        this.accuracy = 0;
        this.wpm = 0;
    }

    get_current() { return this.sequence[this.position]}
    get_next() {return this.sequence[this.position + 1]}
    get_at(position: number) { return this.sequence[position]}
}