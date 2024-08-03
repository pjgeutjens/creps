import { tests } from "$lib/data";

// export const inputFunctions = [

// `export function letterToHtml(letter: string) {
//     if (letter.charCodeAt(0) === 10) {
//         return '<br/>';
//     }
//     if (letter.charCodeAt(0) === 32) {
//         return '&ensp;';
//     }
//     return letter;
// };`,
// `export const test = () => {
//     return x;
// };
// `
// ]

export type TestFunction = {
    content: string;
    description: string;
    language: string;
}

export function getTestFunctions(language:string, mode: 'functions' | 'patterns' | 'zen' = 'functions', amount:number = 1): TestFunction[] {
    if (mode === 'zen') {
        return [];
    }
    const candidates = tests.filter((t) => t.language === language && t.mode === mode).sort(() => 0.5 - Math.random());
    return candidates.slice(0, amount);
}

