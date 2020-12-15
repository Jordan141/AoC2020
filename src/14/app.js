const raw = require('fs').readFileSync(__dirname + '/input.txt', 'utf-8')

const prepareInput = (rawInput) =>
    rawInput
        .split("\n")
        .map((x) => x
            .startsWith("mask")
            ? x.match(/^mask \= (.*)/)[1]
            : x
            .match(/mem\[(\d+)\] \= (\d+)/)
            .slice(1)
            .map(BigInt)
)

function partOne(data) {
    const input = prepareInput(data)
    const memory = new Map()

    let maskAND = 0n
    let maskOR = 0n

    input.forEach(item => {
        if(typeof item === "string") {
            maskAND = BigInt(parseInt(item.replace(/X/g, '1'), 2))
            return maskOR = BigInt(parseInt(item.replace(/X/g, '0'), 2))
        }
        const [address, value] = item
        const val = (value | maskOR) & maskAND
        memory.set(address, val)
    })
    return Number([...memory.values()].reduce((a, b) => a + b))
}

function partTwo(rawInput) {
    const input = prepareInput(rawInput)
    const memory = new Map()

    let maskOR = 0n
    let floatsPos = []
    
    input.forEach(item => {
        if(typeof item ==='string') {
            maskOR = BigInt(parseInt(item.replace(/X/g, '0'), 2))
            return floatsPos = Array.from(item.matchAll(/X/g), (x) => BigInt(x.index))
        } 
        const [address, value] = item
        const addr = address | maskOR
        const combinationsSize = 2 ** floatsPos.length

        for (let i = 0n; i < combinationsSize; i++) {
            let maskXOR = 0n
            floatsPos.forEach((pos, index) => {
                const pow = BigInt(index)
                const isOn = (i & (2n ** pow)) !== 0n

                if (isOn) maskXOR |= 1n << (36n - pos - 1n)
            })

            memory.set(addr ^ maskXOR, value)
        }
    })
    return Number([...memory.values()].reduce((a, b) => a + b))
}

console.time("Time")
const resultA = partOne(raw)
const resultB = partTwo(raw)
console.timeEnd("Time")
console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)