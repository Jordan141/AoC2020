const raw = require('fs').readFileSync(__dirname + '/input.txt', 'utf-8')

function getRules(input, callback, reduceStarter) {
    return input.split('\n').reduce((rules, line) => {
        const [, colour, otherColours] = /(\w+ \w+) bags contain (.*)\./.exec(line)
        return callback(rules, colour, otherColours)
    }, reduceStarter)
}

const partOneRules = getRules(raw, partOne, [])

function expand(bag) {
    const colours = [...partOneRules[bag].values()]
    for(const colour of partOneRules[bag].values()) {
        colours.push(...expand(colour))
    }   
    return colours
}

function partOne(rules, colour, otherColours) {
    const compatibleWith = otherColours !== 'no other bags'
        ? otherColours.split(', ').map((other) => /(\w+ \w+) bags?/.exec(other)[1])
        : []
    
    rules[colour] = new Set()
    compatibleWith.forEach(otherColour => rules[colour].add(otherColour))
    return rules
}

//Part One
const answer = Object.keys(partOneRules).filter(key => expand(key).includes('shiny gold')).length
console.log('Part One:', answer)

function partTwo(rules, colour, otherColour) {
    const compatibleWith = otherColour !== 'no other bags'
      ? otherColour.split(', ').map((other) => {
        const [, units, colour] = /(\d+) (\w+ \w+) bags?/.exec(other)
        return { units: parseInt(units), colour }
      })
      : []

    rules.set(colour, [])
    compatibleWith.forEach((otherColour) => rules.get(colour).push(otherColour))
    return rules
}

const partTwoRules = getRules(raw, partTwo, new Map())

const traverse = (bag) => {
    let total = 0
    for (const {colour, units} of partTwoRules.get(bag)) {
        total += units + units * traverse(colour)
    }
    return total
}

//Part Two
const otherAnswer = traverse('shiny gold')
console.log('Part Two:', otherAnswer)