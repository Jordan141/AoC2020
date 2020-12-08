const raw = require('fs').readFileSync(__dirname + '/input.txt', 'utf-8')
const TEST_DATA = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`

const NOP = 'nop', ACC = 'acc', JMP = 'jmp'

const EXIT_CODE = {
    'EOF': 0,
    'LOOP': 1,
    'ERROR': 2
}

function parseBootCodetoInstructions(input) {
    return input.split('\n')
}

function runBootCode(code) {
    let instruction = 0
    let accumulator = 0
    let ops = []
    let exitCode = null

    while(true) {
        if(ops.includes(instruction)) {
            exitCode = EXIT_CODE.LOOP
            break
        } else if(instruction >= code.length) {
            exitCode = EXIT_CODE.EOF
            break
        }

        const command = code[instruction].slice(0, 3)
        const argument = +code[instruction].slice(4)

        ops.push(instruction)

        switch(command) {
            case ACC:
                accumulator += argument
                instruction++
                break
            case JMP:
                instruction += argument
                break
            default:
                instruction++
        }
    }

    let result = {ops, accumulator, exitCode}
    return result
}

function logResult(result, desc, testCond = false, testExitCode = false) {
    console.log(`Completed ${result.ops.length} operations.`);

    if (testCond) {
        console.log(`  Accumulator Value should be ${testCond}: ${result.accumulator === testCond ? '\u2713 PASS' : '\u2716 FAIL'}`)
    } else {
        console.log(`${desc} accumulator value: ${result.accumulator}`);
    }

    if (testExitCode) {
        console.log(`  Exit Code should be ${testExitCode}: ${result.exitCode === testExitCode ? '\u2713 PASS' : '\u2716 FAIL'}`)
    } else {
        console.log(`${desc} exit code: ${result.exitCode}`)
    }
    console.log('\n')
}

function swapInstruction(instruction) {
    if(instruction.includes(NOP)) {
        return instruction.replace(NOP, JMP)
    }
    return instruction.replace(JMP, NOP)
}

function fixBootCode(code) {
    const possibleChanges = []
    code.forEach((line, index) => {
        (line.includes(NOP) || line.includes(JMP)) && possibleChanges.push([index, line])
    })

    let result = runBootCode(code)
    for(let change of possibleChanges) {
        let newCode = Array.from(code)
        newCode[change[0]] = swapInstruction(newCode[change[0]])
        result = runBootCode(newCode)
        if(result.exitCode === EXIT_CODE.EOF) break
    }
    return result
}

function main(bootCode, partTwo = false) {
    const bootInstructions = parseBootCodetoInstructions(bootCode)
    const result = partTwo ? fixBootCode(bootInstructions) : runBootCode(bootInstructions)
    return result
}

logResult(main(TEST_DATA), 'Test Data part 1', 5, EXIT_CODE.LOOP)

logResult(main(raw), 'Live Data part 1', undefined, EXIT_CODE.LOOP)

logResult(main(TEST_DATA, true), 'Test Data part 2', 8, EXIT_CODE.EOF)

logResult(main(raw, true), 'Live Data part 2', undefined, EXIT_CODE.EOF)