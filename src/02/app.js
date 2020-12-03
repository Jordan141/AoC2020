const raw = require('fs').readFileSync(__dirname + '/input.txt', 'utf-8')
const input = raw.split('\n')


function policyMaker(str) {
    const [policy, password] = str.split(': ')
    const [limits, identifier] = policy.split(' ')
    const [min, max] = limits.split('-').map(Number)

    return {
        policy: {
            identifier,
            min,
            max
        },
        password
    }
}

function prepareList(list, cb) {
    let validPasswords = list.filter(item => {
        const password = item.password
        const {min, max, identifier} = item.policy
        return cb(password, identifier, min, max)
    })

    return validPasswords.length
}

function partOne(password, identifier, min, max) {
    const identifierAmount = password.split('')
        .filter(letter => letter === identifier)
        .length

    return (identifierAmount >= min && identifierAmount <= max)
}

function partTwo(password, identifier, min, max) {
    const checkOne = password[min - 1] === identifier
    const checkTwo = password[max - 1] === identifier
    return checkOne ^ checkTwo
}

const policyList = input.map(policyMaker)

const validPasswords = prepareList(policyList, partOne)
console.log(validPasswords)

const validTobagganPasswords = prepareList(policyList, partTwo)
console.log(validTobagganPasswords)
