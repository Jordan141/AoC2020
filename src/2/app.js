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

function partOne(list) {
     let validPasswords = list.filter(item => {
        const password = item.password
        const {min, max, identifier} = item.policy

        const identifierAmount = password.split('').filter(letter => letter === identifier).length
        return (identifierAmount >= min && identifierAmount <= max)
    })

    return validPasswords.length
}

function partTwo(list) {
    const validPasswords = list.filter(item => {
        const password = item.password
        const {min, max, identifier} = item.policy

        const checkOne = password[min - 1] === identifier
        const checkTwo = password[max - 1] === identifier
        return checkOne ^ checkTwo
    })

    return validPasswords.length
}

const policyList = input.map(policyMaker)

const validPasswords = partOne(policyList)
console.log(validPasswords)

//Tobaggan indices start from 1
const validTobagganPasswords = partTwo(policyList)
console.log(validTobagganPasswords)
