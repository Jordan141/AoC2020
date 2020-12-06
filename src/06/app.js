const raw = require('fs').readFileSync(__dirname + '/input.txt', 'utf-8')
const groups = raw.split('\n\n').map(group => group.split('\n'))

function positiveAnswers(group) {
    const answers = new Set(group.join(''))
    return answers.size
}

//Part one
const sum = groups.reduce((total, group) => total += positiveAnswers(group), 0)
console.log('Sum:', sum)