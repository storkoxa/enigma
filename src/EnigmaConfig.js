import { createRandomArray, createRandomPairedArray } from "./Util.js";
import { RotorObj } from "./Rotor";

const letters = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"]
];


const rotorI = RotorObj(createRandomArray(26, 1), 1, 0)
const rotorII = RotorObj(createRandomArray(26, 2), 6, 5)
const rotorIII = RotorObj(createRandomArray(26, 3), 7, 6)
const rotorIV = RotorObj(createRandomArray(26, 4), 24, 3 )
const rotorV = RotorObj(createRandomArray(26, 5), 24, 4)

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
