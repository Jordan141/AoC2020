const raw = require('fs').readFileSync(__dirname + '/input.txt', 'utf-8')
const inputs = raw.split('\n')

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

function parseSeat(string, letters) {
    const lowerBound = new RegExp(`${letters[0]}`, 'g')
    const upperBound = new RegExp(`${letters[1]}`, 'g')
    return Number.parseInt(string.replace(lowerBound, '0').replace(upperBound, '1'), FROM_BINARY)
}

//Part One
const HIGHEST_SEAT_ID = inputs.reduce((max, curr) => Math.max(max, convertToSeat(curr)), 0)
console.log(HIGHEST_SEAT_ID)

//Part Two
function findMySeat() {
    const seats = inputs.map(convertToSeat).sort()
,i) => seats[i+1] - seat > 1) + 1
}

console.log(findMySeat())