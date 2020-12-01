const raw = require('fs').readFileSync('./input.txt', 'utf-8')
const input = raw.split('\n').map(Number)

function find(list) {
    const TOTAL = 2020

    for(let i = 0; i < list.length; i++) {
        for(let j = i+1; j < list.length; j++) {
            if(list[i] + list[j] == TOTAL) return [list[i], list[j]]
        }
    }
}

const pair = find(input)
console.log(`${pair[0]} + ${pair[1]} = 2020`)
console.log(`Part One: Result is ${pair[0] * pair[1]}`)
