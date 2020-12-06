const raw = require('fs').readFileSync(__dirname + '/input.txt', 'utf-8')
const groups = raw.split('\n\n').map(group => group.split('\n'))

function anyYesCount(group) {
    const uniqueAnswers = new Set(group.join(''))
    return uniqueAnswers.size
}

//Part one
const sum = groups.reduce((total, group) => total += anyYesCount(group), 0)
console.log('Part One Sum:', sum)

function findCommonAnswers(group) {
    const commonAnswers = group.shift().reduce((total, curr) => {
        if(!total.includes(curr) && group.every(person => person.includes(curr))) {
            total.push(curr)
        }

        return total
    }, [])

    return commonAnswers
}

const groupData = groups.map(group => group.map(person => person.split('')))

const partTwoSum = groupData.reduce((sum, curr) => sum += findCommonAnswers(curr).length, 0)
console.log('Part Two Sum:', partTwoSum)