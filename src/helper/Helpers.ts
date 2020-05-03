export function randomNumber(lower: number, upper: number) {
    return Math.floor(Math.random() * upper) + lower + 1;
}