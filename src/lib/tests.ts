export const inputFunctions = [

    `export function letterToHtml(letter: string) {
        if (letter.charCodeAt(0) === 10) {
            return '<br/>';
        }
        if (letter.charCodeAt(0) === 32) {
            return '&ensp;';
        }
        return letter;
    };
      `,
    `
    export const test = () => {
      return x;
    };
      `
]

export function getRandomTestFunction() {
    return inputFunctions[Math.floor(Math.random() * inputFunctions.length)].trim();
}