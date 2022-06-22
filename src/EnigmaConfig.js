import { createRandomArray, createRandomPairedArray } from "./Util.js";
import { RotorObj } from "./Rotor";

const letters = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"]
];


const rotorI = RotorObj(createRandomArray(26, 1), 24)
const rotorII = RotorObj(createRandomArray(26, 2), 1)
const rotorIII = RotorObj(createRandomArray(26, 3), 14)
const rotorIV = RotorObj(createRandomArray(26, 4), 24)
const rotorV = RotorObj(createRandomArray(26, 5), 24)

const reflector = createRandomPairedArray(26, 10);

const plugs = "AB IK";

export const config = {
    rotorPositions: [23, 25, 12],
    rotors: [rotorI, rotorII, rotorIII],
    reflector: reflector,
    plugs: plugs,
    letters: letters,
    countLetters: letters.flat().length
};
