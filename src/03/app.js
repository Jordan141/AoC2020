const raw = require('fs').readFileSync(__dirname + '/input.txt', 'utf-8')
const input = raw.split('\n')

const TREE = '#'

function makeMap(map) {
    return {
        __map: map,
        getPos: (x, y) => map[y][x % map[0].length],
        getHeight: () => map.length
    }
}

function travelSlope(dx, dy, map) {
    let x = 0, y = 0, trees = 0
    
    while(y < map.getHeight()) {
        const currentPos = map.getPos(x, y)
        if(currentPos === TREE) trees++

        x += dx
        y += dy
    }

    return trees
}

const gridMap = makeMap(input.map(line => [...line]))
console.log(travelSlope(3, 1, gridMap))