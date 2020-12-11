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


function partOne(input) {
    const adapters = parseInput(input)
    return findJoltageDifference(adapters)
}

console.log(partOne(raw))