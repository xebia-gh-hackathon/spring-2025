// This file contains utility functions that assist with various tasks in the game.

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = getRandomInt(0, i);
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function isValidCoordinate(x, y, boardSize) {
    return x >= 0 && x < boardSize && y >= 0 && y < boardSize;
}

function calculateDistance(coord1, coord2) {
    return Math.sqrt(Math.pow(coord2.x - coord1.x, 2) + Math.pow(coord2.y - coord1.y, 2));
}

export { getRandomInt, shuffleArray, isValidCoordinate, calculateDistance };