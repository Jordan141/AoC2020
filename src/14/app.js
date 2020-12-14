const { parse } = require('path')

const raw = require('fs').readFileSync(__dirname + '/input.txt', 'utf-8')
const input = raw.split('\n')
const MASK = 'mask'
const MAX_SIZE = 36

function partOne(data) {
    let mask, mem = {}

    data.forEach(i => {
        let [cmd, val] = i.split(' = ')
        if(cmd === MASK) return mask = val

        cmd = parseInt(cmd.substr(4))
        val = parseInt(val).toString(2).split('')

        while(val.length < MAX_SIZE) val.unshift(0)

        for(let j = 0; j < MAX_SIZE; j++) {
            if(mask[j] != 'X') val[j] = mask[j]
        }

        val = parseInt(val.join().replace(/,/g, ''),2)
        mem[cmd] = val
    })

    let sum = 0
    for(let i in mem) sum += mem[i]
    return sum
}

const sum = partOne(input)

console.log(sum)