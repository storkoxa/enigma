import { createRandomArray, createRandomPairedArray } from "./Util.js";

const letters = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"]
];

const roterI = createRandomArray(26, 1);
const roterII = createRandomArray(26, 2);
const roterIII = createRandomArray(26, 3);
const roterIV = createRandomArray(26, 4);
const roterV = createRandomArray(26, 5);

const reflector = createRandomPairedArray(26, 10);

const plugs = [];

export const config = {
    rotorsPositions: [23, 25, 12],
    rotors: [roterI, roterII, roterIII],
    reflector: reflector,
    plugs: plugs,
    letters: letters,
    countLetters: letters.flat().length
};
