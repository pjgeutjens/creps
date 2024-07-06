// place files you want to import through the `$lib` alias in this folder.
const lowerCaseLetters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const upperCaseLetters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const numbersZeroToNine = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const selectedSpecialCharacters = [
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "+",
    "-",
    ".",
    "~",
    "|",
    "<",
    ">",
    "=",
    "-",
    "_",
    "/",
    ":",
    ";",
    "?",
    "[",
    "]",
    "{",
    "}",
    "~",
  ];
  const allCharacters = lowerCaseLetters
    .concat(upperCaseLetters)
    .concat(numbersZeroToNine)
    .concat(selectedSpecialCharacters);
  const alphabet = new Set(allCharacters.concat([" "]));