const raw = require('fs').readFileSync(__dirname + '/input.txt', 'utf-8')
const EARLIEST_TIMESTAMP = Number(raw.split('\n')[0])
const BUS_ROUTES = raw.split('\n')[1].split(',').filter(x => x !== 'x').map(Number)

function timeLeft(id, time) {
    let timeLeft = time % id
    if(timeLeft > 0) {
        timeLeft = id - timeLeft
    }
    return timeLeft
}

function partOne(input) {
    let startTime = input[0]
    let busIds = input[1]

    let busTimeLeft = busIds.map(busId => timeLeft(busId, startTime))
    let minWaitTime = busTimeLeft[0]
    let minWaitTimeId = busIds[0]
    for(let i = 1; i < busIds.length; i++) {
        if(busTimeLeft[i] < minWaitTime) {
            minWaitTime = busTimeLeft[i]
            minWaitTimeId = busIds[i]
        }
    }
    return minWaitTime * minWaitTimeId
}

const partOneResult = partOne([EARLIEST_TIMESTAMP, BUS_ROUTES])


console.log(partOneResult)

//Part Two completed using Wolfram because JS can't handle large numbers
487905974205117