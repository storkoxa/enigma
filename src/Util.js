import shuffleSeed from "shuffle-seed";

export function createRandomArray(size, hash) {
    let array = Array.from({ length: size }, (_, i) => i);
    return shuffleSeed.shuffle(array, hash);
}
export function createRandomPairedArray(size, hash) {
    let random = createRandomArray(size, hash);
    let final = Array(size);
    let half = size / 2;
    for (let i = 0; i < half; i++) {
        final[random[i]] = random[half + i];
        final[random[half + i]] = random[i];
    }
    return final;
}
export function circularNumber(num, max) {
    return (num + max) % max;
}
