import { get, writable, type Writable } from "svelte/store";
import { alphabet } from "./alphabet";
import { getTestFunctions, type TestFunction } from "./tests";

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

export type languages = 'javascript' | 'python' | 'golang' | 'typescript' | 'bash'

export type gameModes = 'functions' | 'patterns' | 'zen'

type HistoryItem = {
    functionName: string,
    testLength: number,
    errors: number,
    wpm: number,
    accuracy: number,
}

type Timer = {
    start: number | null,
    end: number | null,
    remaining: number,
    elapsed: number,
    running: boolean,
    paused: boolean,
    _interval: NodeJS.Timeout | null,
}

export class Game {
    position: number;
    tests: TestFunction[];
    testIndex: number;
    state: 'setup' | 'active' | 'ended' | 'paused';
    gameMode: gameModes;
    sequence: Part[];
    history: HistoryItem[];
    ignoreSemicolon: boolean = false;
    language: string;
    duration: number;
    letter_count: number;
    word_count: number;
    start_time: number | null;
    end_time: number | null;
    error_pos: Set<number>;
    was_skipped: boolean;
    testTimeElapsed: number;
    totalTimeElapsed: number;
    accuracy: number;
    wpm: number;
    randy: number
    tabDepth: number = 0
    tabNumberOfSpaces: number = 2
    showStatsOverlay: boolean = false
    timer: Writable<Timer>

    constructor(language: string, ignoreSemicolon: boolean = false, duration: number = 30, gameMode: gameModes = 'functions') {
        console.log("l", language)
        this.gameMode = gameMode;
        this.tests = getTestFunctions(language, gameMode, 6);
        this.testIndex = 0;
        // this.ignoreSemicolon = ignoreSemicolon;
        this.language = language;
        this.duration = duration;
        this.position = 0;
        this.randy = Math.random();
        this.sequence = []
        this.setInitialSequence(this.gameMode);
        this.state = 'setup';
        this.history = [];
        this.error_pos = new Set();
        this.letter_count = 0;
        this.word_count = 0;
        this.start_time = new Date().getTime();
        this.end_time = null;
        this.was_skipped = false;
        this.tabDepth = 0;
        this.timer = writable({
            start: null,
            end: null,
            remaining: this.duration,
            elapsed: 0,
            running: false,
            paused: false,
            _interval: null,
        })
        this.testTimeElapsed = 0;
        this.totalTimeElapsed = 0;
        this.accuracy = 0;
        this.wpm = 0;
    }

    startTimer() {
        console.log("starting timer")
        const newStartTime = get(this.timer).start === null ? new Date().getTime() : get(this.timer).start;
        const newEndTime = get(this.timer).end === null ? new Date().getTime() + this.duration * 1000 : get(this.timer).end;
        const newRemaining = get(this.timer).remaining === this.duration ? this.duration : get(this.timer).remaining;
        const newElapsed = get(this.timer).elapsed === 0 ? 0 : get(this.timer).elapsed;
        clearInterval(get(this.timer)._interval!);
        this.timer.set({
            start: newStartTime,
            end: newEndTime,
            remaining: newRemaining,
            elapsed: newElapsed,
            running: true,
            paused: false,
            _interval: setInterval(() => {
                this.timer.update((timer) => {
                        timer.elapsed++;
                        timer.remaining = this.duration - timer.elapsed;
                        if (!this.isInfinite() && timer.remaining < 0) {
                        this.end();
                        }
                    
                    return timer;
                })
            }, 1000)
        })
    }

    stopTimer() {
        this.timer.update((timer) => {
            timer.paused = true;
            timer.running = false;
            clearInterval(timer._interval!);
            return timer;
        })
    }

    resetTimer() {
        this.timer.set({
            start: null,
            end: null,
            remaining: this.duration,
            elapsed: 0,
            running: false,
            paused: false,
            _interval: null,
        })
    }

    endTimer() {
        this.timer.update((timer) => {
            timer.running = false;
            timer.paused = false;
            clearInterval(timer._interval!);
            return timer;
        })
    }

    setInitialSequence(mode: 'functions' | 'patterns' | 'zen') {
        this.tests = getTestFunctions(this.language, mode, 6);
        if (mode === 'zen') {
            this.sequence = [];
            return
        } else {
            this.sequence = Array.from(this.tests[this.testIndex].content.trim()).map((character: string) => ({
                character,
                state: CharacterState.REMAINING,
            }));
        }
        console.log("sequence", this.sequence)
    }

    handleKeydown(e: KeyboardEvent) {
        e.preventDefault(); { { } }

        let current, next, prev;

        if (e.ctrlKey || e.altKey || e.metaKey ||
            e.key === "Shift" ||
            e.key === "CapsLock" ||
            e.key === "Escape") {
                console.log("esc")
                return
        }

        if (this.state === "setup") {
            this.start()
            return;
        }
        if (this.state === "paused") {
            this.startTimer();
        }
        if (this.state === "ended") {
            return;
        }

        if(e.key === "ArrowLeft") {
            if (this.position > 0) {
                this.position--;
            }
            return
        }

        if (e.key === "ArrowRight") {
            if (this.position < this.sequence.length) {
                this.position++;
            }
            return
        }

        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
            // this.tabDepth++;
            return
        }

        if (e.key === "Backspace" && this.position === 0) {
            this.pause();
        }


        if (e.key === "Tab") {
            this.sequence.push({
                character: " ".repeat(this.tabNumberOfSpaces),
                state: CharacterState.CORRECT,
            });
            this.position++;
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
                character: '\n',
                state: CharacterState.CORRECT,
            });
            this.position++;
            // TODO something still not right in python with the tabbing for colon
            if (prev.character === "{" || prev.character === "(" || prev.character === ":") {
                this.tabDepth++;
            }
            for (let i = 0; i < this.tabDepth; i++) {
                this.sequence.push({
                    character: " ".repeat(this.tabNumberOfSpaces),
                    state: CharacterState.CORRECT,
                });
                this.position++;
            }
            return
        }

        if (this.gameMode === 'zen' && e.key === "}") {
            this.sequence.pop();
            this.position--;
            if (this.tabDepth > 0) {
                this.tabDepth--;
            }
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
            let char = this.sequence.pop();
            if ((char?.character === "{" || char?.character === ":") && this.tabDepth > 0) {
                this.tabDepth--;
            }
            this.position--;
            while (this.position > 0 && !alphabet.has(this.sequence[this.position - 1]?.character)) {
                this.sequence.pop();
                this.position--;
            }
            return
        }

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
        this.tests = this.gameMode === 'zen' ? [] : getTestFunctions(this.language, this.gameMode, 6);
        this.timer.set({
            start: null,
            end: null,
            remaining: this.duration,
            elapsed: 0,
            running: false,
            paused: false,
            _interval: null,
        })
        console.log(get(this.timer))

        this.state = 'paused';
        this.testIndex = 0;
        this.setInitialSequence(this.gameMode);
        this.position = 0;
        this.history = [];
        this.error_pos = new Set();
        this.letter_count = 0;
        this.word_count = 0;
        this.testTimeElapsed = 0;
        this.totalTimeElapsed = 0;
        // this.duration = this.gameMode === 'zen' ? 0 : this.duration;
    }

    getRemainingTime() {
        return get(this.timer).remaining;
    }

    getElapsedTime() {
        return get(this.timer).elapsed;
    }

    updateStats() {
        this.accuracy = this.calculateAccuracy();
        this.wpm = this.calculateWPM();

    }

    calculateAccuracy() {
        return this.letter_count > 0 ? ((this.letter_count - this.error_pos.size) / this.letter_count) * 100 : 0;
    }

    calculateWPM() {
        return (this.letter_count / this.getTimeElapsed()) * 60 / 5;
    }

    getTimeRemaining() {
        return get(this.timer).remaining;
    }

    getTimeElapsed() {
        return get(this.timer).elapsed;
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
        this.tests = this.tests.concat(getTestFunctions(this.language, this.gameMode, 1));
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
        console.log("pausing")
        this.state = 'paused';
        this. stopTimer();
    }

    resume() {
        console.log("resuming")
        this.state = 'active';
        // this.startTimer();
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
