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

type HistoryItem = {
    functionName: string,
    testLength: number,
    errors: number,
    wpm: number,
    accuracy: number,
}

export class Game {
    position: number;
    tests: TestFunction[];
    testIndex: number;
    state: 'setup' | 'active' | 'ended' | 'paused';
    sequence: Part[];
    history: HistoryItem[];
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
    testTimeElapsed: number;
    totalTimeElapsed: number;
    accuracy: number;
    wpm: number;

    constructor(language: string, ignoreSemicolon: boolean = false, duration: number = 999) {
        console.log("l", language)
        this.tests = getRandomTestFunctions(language, 10);
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
        this.testTimeElapsed = 0;
        this.totalTimeElapsed = 0;
        this.accuracy = 0;
        this.wpm = 0;
    }

    start() {
        this.state = 'active';
        this.start_time = new Date().getTime();
    }

    reset() {
        console.log("resetting")
        this.tests = getRandomTestFunctions(this.language, 10);
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
        this.testTimeElapsed = 0;
        this.totalTimeElapsed = 0;
    }

    updateStats() {
        this.accuracy = this.calculateAccuracy();
        this.wpm = this.calculateWPM();

    }

    calculateAccuracy() {
        return this.letter_count > 0 ? ((this.letter_count - this.error_pos.size) /  this.letter_count) * 100 : 0;
    }

    calculateWPM() {
        console.log(this.letter_count, " / ", this.testTimeElapsed)
        return (this.letter_count / this.testTimeElapsed) * 60 / 5;
    }

    calculateGlobalAccuracy() {
        if (this.history.length === 0) {
            return this.calculateAccuracy();
        }
        const totalLength = this.history.reduce((acc, item) => acc + item.testLength, 0);
        const totalErrors = this.history.reduce((acc, item) => acc + item.errors, 0);
        const totalCorrect = totalLength - totalErrors;
        return totalCorrect / totalLength * 100;
    }

    calculateGlobalWPM() {
        if (this.history.length === 0) {
            return this.calculateWPM();
        }
        const totalLength = this.history.reduce((acc, item) => acc + item.testLength, 0);
        const weighedWPM = this.history.reduce((acc, item) => acc + item.wpm * item.testLength, 0);
        return weighedWPM / totalLength;
    }


    nextTest() {
        this.history.push({
            functionName: this.testIndex.toString(),
            wpm: this.wpm,
            accuracy: this.accuracy,
            errors: this.error_pos.size,
            testLength: this.tests[this.testIndex].content.length,
        });
        this.testIndex++
        this.tests = this.tests.concat(getRandomTestFunctions(this.language, 1));
        this.position = 0;
        this.letter_count = 0;
        this.word_count = 0;
        this.error_pos = new Set();
        this.testTimeElapsed = 0;
        this.sequence = Array.from(this.tests[this.testIndex].content.trim()).map((character: string) => ({
            character,
            state: CharacterState.REMAINING,
        }));
    }

    pause() {
        this.state = 'paused';
    }

    getSequence() { return this.sequence }

    end() {
        this.totalTimeElapsed = new Date().getTime() - this.start_time!;
        this.state = 'ended';
    }

    get_current() { return this.sequence[this.position] }
    get_next() { return this.sequence[this.position + 1] }
    get_at(position: number) { return this.sequence[position] }
}
