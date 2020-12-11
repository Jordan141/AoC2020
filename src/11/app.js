const input = require('fs').readFileSync(__dirname + '/input.txt', 'utf-8').split('\n')

const TOP = 'top', BOTTOM = 'bottom', LEFT = 'left', RIGHT = 'right', NONE = '', EMPTY = 'L', OCCUPIED = '#', FLOOR = '.'

const gameOfLife = (seats, occupied = 0, firstAvailable, iteration = 0) => {
    const loopThrough = (i, j, direction, limit, current = 1) => {
        if (!seats[i] || !seats[i][j]) return NONE
        if (limit && limit === current) return seats[i][j]
        if (seats[i][j] !== FLOOR) return seats[i][j]
    
        return loopThrough(
          direction[0] === TOP ? i - 1 : direction[0] === BOTTOM ? i + 1 : i,
          direction[1] === LEFT ? j - 1 : direction[1] === RIGHT ? j + 1 : j,
          direction, limit, current + 1
        )
    }

    const findFirstAvailable = (i, j, limit) => {
        let count = 0
        if (loopThrough(i - 1, j - 1, [TOP, LEFT], limit) === OCCUPIED) count += 1
        if (loopThrough(i - 1, j, [TOP], limit) === OCCUPIED) count += 1
        if (loopThrough(i - 1, j + 1, [TOP, RIGHT], limit) === OCCUPIED) count += 1
        if (loopThrough(i, j + 1, [NONE, RIGHT], limit) === OCCUPIED) count += 1
        if (loopThrough(i + 1, j + 1, [BOTTOM, RIGHT], limit) === OCCUPIED) count += 1
        if (loopThrough(i + 1, j, [BOTTOM], limit) === OCCUPIED) count += 1
        if (loopThrough(i + 1, j - 1, [BOTTOM, LEFT], limit) === OCCUPIED) count += 1
        if (loopThrough(i, j - 1, [NONE, LEFT], limit) === OCCUPIED) count += 1
        return count
    }

    let newOccupied = 0
    const newConfiguration = seats.map((row, i) => row.map((space, j) => {
        if (space === EMPTY) {
            if (findFirstAvailable(i, j, firstAvailable ? 0 : 1) === 0) {
                newOccupied += 1
                return OCCUPIED
            }
            return EMPTY
        }
        if (space === OCCUPIED) {
            if (findFirstAvailable(i, j, firstAvailable ? 0 : 1) >= (firstAvailable ? 5 : 4)) {
                return EMPTY
            }
            newOccupied += 1
            return OCCUPIED
        }
        if (space === FLOOR) return FLOOR
    }))

    if(occupied === newOccupied) return occupied
    return gameOfLife(newConfiguration, newOccupied, firstAvailable, iteration + 1)
}

console.time('Solution takes')
const partOne = (values) => gameOfLife(values.map((row) => row.split('')))
const partTwo = (values) => gameOfLife(values.map((row) => row.split('')), 0, true)
console.timeEnd('Solution takes')

console.log('Part One', partOne(input))
console.log('Part Two', partTwo(input))