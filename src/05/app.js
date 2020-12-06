const raw = require('fs').readFileSync(__dirname + '/input.txt', 'utf-8')
const seatExpression = /([FB]{7})([RL]{3})/
const FROM_BINARY = 2
const ROW = ['F', 'B']
const COLUMN = ['L', 'R']

function convertToSeat(code) {
    const result = seatExpression.exec(code)
    const rowNum = parseSeat(result[1], ROW)
    const colNum = parseSeat(result[2], COLUMN)
    return rowNum * 8 + colNum
}

function parseSeat(seatCode, keys) {
    const lowerBound = new RegExp(`${keys[0]}`, 'g')
    const upperBound = new RegExp(`${keys[1]}`, 'g')
    return Number.parseInt(seatCode.replace(lowerBound, '0').replace(upperBound, '1'), FROM_BINARY)
}

const inputs = raw.split('\n').map(convertToSeat).sort((a, b) => a - b)

//Part One
const HIGHEST_SEAT_ID = inputs.splice(-1)
console.log(HIGHEST_SEAT_ID)

//Part Two
function findMySeat(arr) {
    return arr.find((x,i) => arr[i+1]-x > 1) + 1
}

console.log(findMySeat(inputs))