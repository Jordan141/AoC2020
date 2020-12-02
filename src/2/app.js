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
    let validPasswords = 0
    list.forEach(elem => {
        const identifierAmount = elem.password.split('').filter(letter => letter === elem.policy.identifier).length
        if(identifierAmount >= elem.policy.min && identifierAmount <= elem.policy.max) validPasswords++
    })

    return validPasswords
}

function partTwo(list) {
    const validPasswords = list.filter(item => {
        const password = item.password
        const {min, max, identifier} = item.policy

        const checkOne = password[min - 1] === identifier
        const checkTwo = password[max - 1] === identifier
        return (!(checkOne && checkTwo)  && (checkOne || checkTwo))
    })

    return validPasswords.length
}

const policyList = input.map(policyMaker)

const validPasswords = partOne(policyList)
console.log(validPasswords)

//Tobaggan indices start from 1
const validTobagganPasswords = partTwo(policyList)
console.log(validTobagganPasswords)
