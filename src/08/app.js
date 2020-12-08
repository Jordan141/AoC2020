const raw = require('fs').readFileSync(__dirname + '/input.txt', 'utf-8')
const TEST_DATA = ["nop +0", "acc +1", "jmp +4", "acc +3", "jmp -3", "acc -99", "acc +1", "jmp -4", "acc +6"]
const NOP = 'nop', ACC = 'acc', JMP = 'jmp'

const input = raw.split('\n').map(elem => {
    const [instr, arg] = elem.split(' ')
    return [instr, Number(arg), 0]
})

function findValue(input) {
    const HAS_BEEN_CALLED = 1

    let GLOBAL_ACCUMULATOR = 0
    let currentAddress = 0
    let valueFound = null

    while(currentAddress < input.length || !valueFound) {
        if(input[currentAddress][2] === HAS_BEEN_CALLED){
            valueFound = GLOBAL_ACCUMULATOR
            return valueFound
        }
        input[currentAddress][2] = HAS_BEEN_CALLED
        switch(input[currentAddress][0]) {
            case NOP:
                currentAddress++
                break;
            case ACC:
                GLOBAL_ACCUMULATOR += input[currentAddress][1]
                currentAddress++
                break
            case JMP:
                currentAddress += input[currentAddress][1]
                break
        }
    }
}

console.log(findValue(input))
