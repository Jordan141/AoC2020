const raw = require('fs').readFileSync('./input.txt', 'utf-8')
const input = raw.split('\n').map(Number)

function findTwo(list) {
    const TOTAL = 2020

    for(let i = 0; i < list.length; i++) {
        for(let j = i+1; j < list.length; j++) {
            if(list[i] + list[j] == TOTAL) return [list[i], list[j]]
        }
    }
}

function findThree(list) {
    const TOTAL = 2020

    for(let i = 0; i < list.length; i++) {
        for(let j = i+1; j < list.length; j++) {
            for(let k = j+1; k < list.length; k++) {
                if((list[i] + list[j] + list[k]) == TOTAL) return [list[i], list[j], list[k]]
            }
        }
    }
}

const pair = findTwo(input)
console.log(`${pair[0]} + ${pair[1]} = 2020`)
console.log(`Part One: Result is ${pair[0] * pair[1]}`)

const three = findThree(input)
console.log(`${three[0]} + ${three[1]} + ${three[2]} = 2020`)
console.log(`Part Two: Result is ${three[0] * three[1] * three[2]}`)
