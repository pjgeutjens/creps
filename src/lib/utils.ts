export function letterToHtml(letter: string, isLast: boolean = false) {
    if (letter.charCodeAt(0) === 10 && isLast) {
        return '';
    }
    if (letter.charCodeAt(0) === 10) {
        return `<br/>`;
    }
    if (letter.charCodeAt(0) === 32) {
        return `&ensp;`;
    }
    return `${letter}`
}

export function isLast(index: number, array: any[]) {
    return index === array.length - 1;
}