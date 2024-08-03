import { alphabet } from "./alphabet";
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

const char_enter = `
`
let tabDepth = 0;
let tabNumberOfSpaces = 4;


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
    gameMode: 'functions' | 'patterns' | 'zen';
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

    constructor(language: string, ignoreSemicolon: boolean = false, duration: number = 30, gameMode: 'functions' | 'zen' = 'zen') {
        console.log("l", language)
        this.gameMode = gameMode;
        this.tests = this.gameMode === 'zen' ? [] : getRandomTestFunctions(language, 6);
        this.testIndex = 0;
        this.ignoreSemicolon = ignoreSemicolon;
        this.language = language;
        this.duration = duration;
        this.position = 0;
        this.sequence = []
        if (gameMode === 'zen') {
            this.sequence = [];
        } else {
            this.sequence = Array.from(this.tests[this.testIndex].content.trim()).map((character: string) => ({
                character,
                state: CharacterState.REMAINING,
            }));
        } 
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

    toggleGameMode() {
        switch (this.gameMode) {
            case 'functions':
                console.log("switching to zen")
                this.gameMode = 'zen';
                break;
            case 'zen':
                console.log("switching to functions")
                this.gameMode = 'functions';
                break;
        }
    }


    handleKeydown(e: KeyboardEvent) {
        if (this.state === "ended" || this.state === "paused") {
            this.start()
            return;
        }
        let current, next, prev;

        if (e.key === "Shift") {
            return
        }
        
        if (this.gameMode === 'zen' && e.key === "Delete") {
            this.sequence = this.sequence.slice(0, this.position).concat(this.sequence.slice(this.position + 1));
            this.position--;
            return
        }

        if (this.gameMode === 'zen' && e.key === "Enter") {
            prev = this.get_at(this.position - 1);
            this.sequence.push({
                character: char_enter,
                state: CharacterState.CORRECT,
            });
            this.position++;
            if (prev.character === "{" || prev.character === "(") {
                tabDepth++;
                for (let i = 0; i < tabDepth * tabNumberOfSpaces; i++) {
                    this.sequence.push({
                        character: " ",
                        state: CharacterState.CORRECT,
                    });
                }
            }
            return
        }

        if (this.gameMode === 'zen' && e.key !== "Backspace") {
            this.sequence.push({
                character: e.key,
                state: CharacterState.CORRECT,
            });
            this.position++;
            return
        }

        if (this.gameMode === 'zen' && e.key === "Backspace") {
            if (this.sequence.length === 0) {
                return
            }
            this.sequence.pop();
            this.position--;
            return
        }
        e.preventDefault();
        if (e.key.toLowerCase() === "backspace") {
            console.log("processing backspace");
            if (this.position > 0) {
                this.position--;
                if (this.gameMode === 'zen') {
                    this.sequence = this.sequence.slice(0, this.position);
                } else {
                this.sequence[this.position].state = CharacterState.REMAINING;
                }
            }
        } else if (e.key.toLowerCase() === "enter") {
            console.log("processing enter");
            current = this.get_current();
            next = this.get_next();
            prev = this.get_at(this.position - 1);
            console.log(prev, current, next);
            if (!next || !current) {
                this.position++;
                if (this.position >= this.sequence.length) {
                    this.word_count++;
                    this.end();
                }
            }
            if (current.character === ";") {
                switch (this.ignoreSemicolon) {
                    case true:
                        console.log("IGNORING SEMICOLON");
                        current.state = CharacterState.SEMI;
                        this.position++;
                        break;
                    case false:
                        console.log("ERROR SEMICOLON");
                        current.state = CharacterState.INCORRECT;
                        this.error_pos.add(this.position);
                        this.position++;
                        break;
                }
                current = this.get_current();
                next = this.get_next();
                prev = this.get_at(this.position - 1);
            }

            while (
                (current && current.character.charCodeAt(0) === 10) ||
                current.character.charCodeAt(0) === 32 ||
                current.character === " "
            ) {
                // console.log("SKIP", current.character.charCodeAt(0))
                current.state = CharacterState.CORRECT;
                this.position++;
                current = this.get_current();
                next = this.get_next();
                prev = this.get_at(this.position - 1);
            }
        } else if (alphabet.has(e.key)) {
            this.letter_count++;
            current = this.get_current();
            next = this.get_next();
            prev = this.get_at(this.position - 1);
            console.log("cnp", current, next, prev);
            if (current.character === e.key) {
                current.state = CharacterState.CORRECT;
                if (e.key === " " || e.key === ";") {
                    this.word_count++;
                }
                this.position++;
            } else if (e.key === " " && current.character !== " " && prev != null && prev.character !== " ") {
                // TODO: refactor this to make it more readable 
                while (![" ", "_", "("].includes(current.character)) {
                    current.state = CharacterState.SKIPPED;
                    this.error_pos.add(this.position);
                    this.was_skipped = true;
                    this.position++;
                    current = this.get_current();
                    next = this.get_next();
                    prev = this.get_at(this.position - 1);
                }
                if (current.character === " ") {
                    this.position++;
                    current = this.get_current();
                    next = this.get_next();
                    prev = this.get_at(this.position - 1);
                }
            } else if (e.key === " ") {
                if (
                    this.position > 0 &&
                    (prev?.character === " " || prev === null)
                ) {
                    let position = this.position;
                    while (
                        position < this.sequence.length &&
                        this.get_at(position)!.character === " "
                    ) {
                        this.error_pos.add(position);
                        this.get_at(position)!.state = CharacterState.SKIPPED;
                        this.was_skipped = true;
                        position++;
                    }
                    this.position = position;
                    // this.position++;
                }
            } else {
                current.state = CharacterState.INCORRECT;
                this.error_pos.add(this.position);
                this.position++;
            }
        }
        if (this.position > 0 && this.start_time === null) {
            this.start_time = performance.now();
        }
        if (this.position >= this.sequence.length) {
            if (!this.was_skipped) {
                // for the last word we don't type space so
                // we count it at the end unless it's skipped
                this.word_count++;
            }
            this.nextTest();
        }

        // let newgameStats = {
        //     wordCount: this.word_count,
        //     charCount: this.letter_count,
        //     wordsPerMinute: ((this.letter_count / game.timeElapsed) * 60) / 5,
        //     accuracy:
        //         game.letter_count > 0
        //             ? ((game.letter_count - game.error_pos.size) /
        //                   game.letter_count) *
        //               100
        //             : 0,
        //     active: thisStats.active,
        //     ended: thisStats.ended,
        // };
        // updateStats(newgameStats);
        this.updateStats();
        return this;
    }

    start() {
        this.state = 'active';
        this.start_time = new Date().getTime();
        this.reset();
    }

    reset() {
        console.log("resetting")
        this.tests = this.gameMode === 'zen' ? [] :  getRandomTestFunctions(this.language, 6);
        this.state = 'paused';
        this.testIndex = 0;
        if (this.gameMode === 'zen') {
            this.sequence = [];
        } else {
            this.sequence = Array.from(this.tests[this.testIndex].content.trim()).map((character: string) => ({
                character,
                state: CharacterState.REMAINING,
            }));
        }
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
        return this.letter_count > 0 ? ((this.letter_count - this.error_pos.size) / this.letter_count) * 100 : 0;
    }

    calculateWPM() {
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

    isInfinite() {
        return this.duration === 0;
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
