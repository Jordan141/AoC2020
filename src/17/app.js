const input = require('fs').readFileSync(__dirname + '/input.txt', 'utf-8').trim().split('\n').map(x => x.split(''))

function countAround(x, y, z, w, map, isPartTwo) {
    let count = 0
    for (let ww = (isPartTwo ? w - 1 : 0); ww <= (isPartTwo ? w + 1 : 0); ww++) {
        for (let zz = z - 1; zz <= z + 1; zz++) {
            for (let yy = y - 1; yy <= y + 1; yy++) {
                for (let xx = x - 1; xx <= x + 1; xx++) {
                    if ((xx !== x || yy !== y || zz !== z || ww !== w) && map.get(`${xx},${yy},${zz},${ww}`)) {
                        count++
                    }
                }
            }
        }
    }
    return count
}

function solve(input, isPartTwo) {
    let map = new Map()
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[0].length; x++) {
            if (input[y][x] === '#') {
                map.set(`${x},${y},0,0`, true)
            }
        }
    }
    let height = [0, input.length]
    let width = [0, input[0].length]
    let depth = [0, 1]
    let hyper = [0, 1]
    for (let t = 0; t < 6; t++) {
        let newMap = new Map()
        depth[0]--
        depth[1]++
        width[0]--
        width[1]++
        height[0]--
        height[1]++
        if (isPartTwo) {
            hyper[0]--
            hyper[1]++
        }
        for (let w = hyper[0]; w < hyper[1]; w++) {
            for (let z = depth[0]; z < depth[1]; z++) {
                for (let y = width[0]; y < width[1]; y++) {
                    for (let x = height[0]; x < height[1]; x++) {
                        let neigh = countAround(x, y, z, w, map, isPartTwo);
                        const isActive = map.get(`${x},${y},${z},${w}`)
                        if (neigh === 3 || (neigh === 2 && isActive)) {
                            newMap.set(`${x},${y},${z},${w}`, true)
                        }
                    }
                }
            }
        }

        map = newMap
    }
    return map.size
}

console.time('Solution takes...')
const resultA = solve(input)
const resultB = solve(input, true)
console.timeEnd('Solution takes...')
console.log('Part 1', resultA)
console.log('Part 2', resultB)
