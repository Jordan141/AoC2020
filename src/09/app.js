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

console.log(findInvalidElement(inputs))