const raw = require('fs').readFileSync(__dirname + '/input.txt', 'utf-8')
const inputs = raw.split('\n').map(Number)

class Xmas {
    constructor(preamble) {
        this.preamble = preamble
    }

    isValid(num) {
        for (let i = 0; i < this.preamble.length; i++) {
            for (let j = i+1; j < this.preamble.length; j++) {
                if(this.preamble[i] + this.preamble[j] === num) {
                    return true
                }
            }
        }
        return false
    }

    push(num) {
        this.preamble.push(num)
        this.preamble.shift()
    }
}

function findInvalidElement(code) {
    const PREAMBLE_LENGTH = 25
    const preamble = code.slice(0, PREAMBLE_LENGTH)
    const xmas = new Xmas(preamble)

    for(let i = PREAMBLE_LENGTH; i < code.length; i++) {
        const elem = code[i]
        if(!xmas.isValid(elem)) return elem
        xmas.push(elem)
    }
}

console.time('Day 09 Solution')
const invalidNumber = findInvalidElement(inputs)

function findWeakness(code, invalidNum) {
    for(let l = 2; l < code.length; l++) {
        for(let i = 0; i < code.length - l + 1; i++) {
            let sum = 0
            for(let j = 0; j < l; j++) {
                sum += code[i+j]
            }
            if(sum === invalidNum) {
                const set = code.slice(i, i+l)
                return Math.min(...set) + Math.max(...set)
            }
        }
    }
}

console.timeEnd('Day 09 Solution')
console.log('Part One:', invalidNumber)
console.log('Part Two:', findWeakness(inputs, invalidNumber))