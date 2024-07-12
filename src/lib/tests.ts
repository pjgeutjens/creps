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

export function getRandomTestFunction(language:string) {
    const candidates = tests.filter((t) => t.language === language);
    return candidates[Math.floor(Math.random() * candidates.length)];
}