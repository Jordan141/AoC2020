const raw = require('fs').readFileSync(__dirname + '/input.txt', 'utf-8')
const input = raw.split('\n\n')

const VALID_FIELDS = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
const OPTIONAL_FIELDS = ['cid']

function validItem(item) {
    return VALID_FIELDS.every(i => item.match(new RegExp(i)))
}

const validPassportCount = input.filter(validItem).length
console.log(validPassportCount)