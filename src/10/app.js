const raw = require('fs').readFileSync(__dirname + '/input.txt', 'utf-8')

function parseInput(input) {
    return input.split('\n')
        .map(x => x.trim())
        .map(x => parseInt(x))
        .filter(x => x)
}

function findJoltageDifference(adapters) {
    adapters.sort((a, b) => a - b)

    let jumpsOfOne = 0
    let jumpsOfThree = 0

    let adapter = 0
    while(adapter < adapters[adapters.length - 1]) {
        if(adapters.includes(adapter + 1)) {
            jumpsOfOne++
            adapter += 1
        } else if(adapters.includes(adapter + 3)) {
            jumpsOfThree++
            adapter += 3
        }
    }

    jumpsOfThree +=1
    return jumpsOfOne * jumpsOfThree
}

const tribonacciSequence = [1, 1, 2, 4, 7, 13, 24, 44, 81, 149]

function getTribonacci(num) {
    if(num > tribonacciSequence.length) return
    return tribonacciSequence[num - 1]
}

function totalDistinctSetups(adapters) {
    const maxJoltage = adapters.sort((a, b) => a - b)[adapters.length - 1]
    const a = adapters.concat([0, maxJoltage + 3]).sort((x, y) => x - y)

    let multiplier = 1
    let currentRun = 1
    for(let joltage of a) {
        if(adapters.includes(joltage + 1)) {
            currentRun++
        } else {
            multiplier *= getTribonacci(currentRun)
            currentRun = 1
        }
    }

    return multiplier
}


function partOne(input) {
    const adapters = parseInput(input)
    return findJoltageDifference(adapters)
}

function partTwo(input) {
    const adapters = parseInput(input)
    return totalDistinctSetups(adapters)
}

console.log(partOne(raw))
console.log(partTwo(raw))