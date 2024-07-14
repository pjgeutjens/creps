import { get } from "svelte/store";
import { getRandomTestFunctions, type TestFunction } from "./tests";

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


export type GameSettings = {
    ignoreSemicolon: boolean
    language: string
    duration: number
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
    tests: TestFunction[];
    testIndex: number;
    state: 'active' | 'ended' | 'paused';
    sequence: Part[];
    history: string[];
    settings: GameSettings;
    letter_count: number;
    word_count: number;
    start_time: number | null;
    error_pos: Set<number>;
    was_skipped: boolean;
    first: boolean;
    timeElapsed: number;
    accuracy: number;
    wpm: number;

    constructor(tests: TestFunction[], settings: GameSettings | null = null) {
        this.tests = getRandomTestFunctions(settings ? settings.language : 'golang', 4);
        this.testIndex = 0;
        this.settings = settings ? settings : { ignoreSemicolon: false, language: 'golang', duration: 30 };
        this.position = 0;
        this.sequence = Array.from(this.tests[this.testIndex].content.trim()).map((character: string) => ({
            character,
            state: CharacterState.REMAINING,
        }));
        this.state = 'paused';
        this.history = [];
        this.error_pos = new Set();
        this.letter_count = 0;
        this.word_count = 0;
        this.start_time = new Date().getTime();
        this.was_skipped = false;


        this.first = true;
        this.timeElapsed = 0;
        this.accuracy = 0;
        this.wpm = 0;
    }

    start() {
        this.state = 'active';
        this.start_time = new Date().getTime();
    }

    nextTest() {
        this.history.push(this.sequence.map((part) => part.character).join(""));
        this.testIndex
        this.sequence = Array.from(this.tests[this.testIndex].content.trim()).map((character: string) => ({
            character,
            state: CharacterState.REMAINING,
        }));
    }

    end() {
        this.timeElapsed = new Date().getTime() - this.start_time!;
        this.state = 'ended';
    }

    get_current() { return this.sequence[this.position] }
    get_next() { return this.sequence[this.position + 1] }
    get_at(position: number) { return this.sequence[position] }
}
