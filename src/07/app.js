const raw = require('fs').readFileSync(__dirname + '/input.txt', 'utf-8')
const rules = raw.split('\n').reduce((rules, line) => {
    const [, colour, otherColours] = /(\w+ \w+) bags contain (.*)\./.exec(line)

    const compatibleWith = otherColours !== 'no other bags'
    ? otherColours.split(', ').map((other) => /(\w+ \w+) bags?/.exec(other)[1])
    : []

    rules[colour] = new Set()
    compatibleWith.forEach(otherColour => rules[colour].add(otherColour))
    return rules
}, {})

function expand(bag) {
    const colours = [...rules[bag].values()]
    for(const colour of rules[bag].values()) {
        colours.push(...expand(colour))
    }   
    return colours
}

//Part One
const answer = Object.keys(rules).filter(key => expand(key).includes('shiny gold')).length
console.log(answer)
