const raw = require('fs').readFileSync(__dirname + '/input.txt', 'utf-8')
const input = raw.split('\n\n')
const _ = require('lodash')

const VALID_FIELDS = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
const HEX_CODE_REGEX = new RegExp(/#([a-f0-9]{3}){1,2}\b/i)
const VALID_EYE_COLOURS = ['amb', 'blu', 'brn', 'grn', 'gry', 'hzl', 'oth']
const DEFAULT_CID_RETURN_VALUE = true
const PID_LENGTH = 9

const verifyFields = {
    byr: (n) => _.inRange(Number(n), 1920, 2003),
    iyr: (n) => _.inRange(Number(n), 2010, 2021),
    eyr: (n) => _.inRange(Number(n), 2020, 2031),
    hgt: (str) => {
        if(str.includes('cm')) 
            return _.inRange(Number(str.split('cm')[0]), 150, 194)
        return  _.inRange(Number(str.split('in')[0]), 59, 77)
    },
    hcl: (str) => str.match(HEX_CODE_REGEX),
    ecl: (str) => VALID_EYE_COLOURS.includes(str),
    pid: (str) => str.length === PID_LENGTH,
    cid: () => DEFAULT_CID_RETURN_VALUE

}

function validPassportCategories(data) {
    return VALID_FIELDS.every(i => data.match(new RegExp(i)))
}

const validPassports = input.filter(validPassportCategories)
console.log(validPassports.length)

function verifyData(data) {
    const passportData = data.split(/\s|\n/).map(line => line.split(':'))
    const isPassportValid = passportData.every(field => verifyFields[field[0]](field[1]))
    return isPassportValid
}

const verifiedPassports = validPassports.filter(verifyData)
console.log(verifiedPassports.length)