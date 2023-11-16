// Single
// max must be greater than min
function getRandInt(min, max) {
    if (max <= min) return NaN;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Array
// count: default and min are '1', max is 100
// repeat: default 'true', allow duplicate numbers
function getRandsInt(min, max, count = 1, repeat = true) {
    let distance = max - min;
    if (distance <= 0 || count < 1 || count > 100 || count >= distance)
        return NaN;

    var array = [];
    for (let i = 0; i < count; i++) {
        let n = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!repeat && array.includes(n)) i--;
        else array.push(n);
    }
    return array;
}

// Matrix
// row, col: default and min are '1', max is 20
function getRandMatInt(min, max, row = 1, col = 1, repeat = true) {
    let distance = max - min,
        count = row * col;
    let rv = row < 1 || row > 20,
        cv = col < 1 || col > 20;

    if (distance <= 0 || rv || cv || count >= distance) return NaN;

    var array = [];
    for (let i = 0; i < count; i++) {
        let n = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!repeat && array.includes(n)) i--;
        else array.push(n);
    }

    var mat = [];
    for (let r = 0; r < row; r++) {
        let start = r * col - 1,
            end = (r + 1) * col;
        mat.push(array.slice(start, end));
    }

    return mat;
}
