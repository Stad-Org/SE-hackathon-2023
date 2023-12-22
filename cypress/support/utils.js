


export function getRandomInt(min, max) {
    // Use Math.floor to round down to the nearest integer
    // Use Math.random to generate a random decimal between 0 and 1
    // Multiply the result by the range (max - min + 1) and add the minimum value
    return Math.floor(Math.random() * (max - min + 1)) + min;
}