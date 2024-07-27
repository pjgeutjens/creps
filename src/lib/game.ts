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
    ignoreSemicolon?: boolean
    language?: string
    duration?: number
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
    ignoreSemicolon: boolean;
    language: string;
    duration: number;
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

    constructor(language: string, ignoreSemicolon: boolean = false, duration: number = 30) {
        console.log("l", language)
        this.tests = getRandomTestFunctions(language, 4);
        this.testIndex = 0;
        this.ignoreSemicolon = ignoreSemicolon;
        this.language = language;
        this.duration = duration;
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
        this.end_time = null;
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

    reset() {
        console.log("resetting")
        this.tests = getRandomTestFunctions(this.language, 4);
        this.state = 'paused';
        this.testIndex = 0;
        this.sequence = Array.from(this.tests[this.testIndex].content.trim()).map((character: string) => ({
            character,
            state: CharacterState.REMAINING,
        }));
        this.position = 0;
        this.history = [];
        this.error_pos = new Set();
        this.letter_count = 0;
        this.word_count = 0;
        this.timeElapsed = 0;
    }

    updateStats() {
        this.accuracy = this.calculateAccuracy();
        this.wpm = this.calculateWPM();

    }

    calculateAccuracy() {
        return this.letter_count > 0 ? ((this.letter_count - this.error_pos.size) /  this.letter_count) * 100 : 0;
    }

    calculateWPM() {
        return (this.letter_count / this.timeElapsed) * 60 / 5;
    }

    nextTest() {
        this.history.push(this.sequence.map((part) => part.character).join(""));
        this.testIndex++
        this.sequence = Array.from(this.tests[this.testIndex].content.trim()).map((character: string) => ({
            character,
            state: CharacterState.REMAINING,
        }));
    }

    getSequence() { return this.sequence }


    end() {
        this.timeElapsed = new Date().getTime() - this.start_time!;
        this.state = 'ended';
    }

    get_current() { return this.sequence[this.position] }
    get_next() { return this.sequence[this.position + 1] }
    get_at(position: number) { return this.sequence[position] }
}
