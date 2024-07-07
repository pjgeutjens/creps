export function letterToHtml(letter: string) {
    if (letter.charCodeAt(0) === 10) {
        return `<br/>`;
    }
    if (letter.charCodeAt(0) === 32) {
        return `&ensp;`;
    }
    return `${letter}`;
}