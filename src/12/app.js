const raw = require('fs').readFileSync(__dirname + '/input.txt', 'utf-8')
const input = raw.split('\n')
const NORTH = 'N', SOUTH = 'S', WEST = 'W', EAST = 'E', LEFT = 'L', RIGHT = 'R', FORWARD = 'F'

function partOne(lines) {
    let posX = 0, posY = 0, angle = 0
    
    for(let line of lines) {
        const dir = line[0]
        const value = Number(line.substr(1))

        switch(dir) {
            case NORTH:
                posY += value
                break
            case SOUTH:
                posY -= value
                break
            case EAST:
                posX += value
                break
            case WEST:
                posX -= value
                break
            case LEFT:
                angle += value
                angle %= 360
                break
            case RIGHT:
                angle += (360 - value)
                angle %= 360
                break
            case FORWARD:
                if(angle == 0) posX += value
                if(angle == 90) posY += value
                if(angle == 180) posX -= value
                if(angle == 270) posY -= value
                break
        }
    }

    return Math.abs(posX) + Math.abs(posY)
}

function partTwo(input) {
    let x = 0, y = 0, wx = 10, wy = 1

    for(let i = 0; i < input.length; i++) {
        const instr = input[i]
        const dir = instr[0]
        let value = Number(instr.substr(1))
        if(dir === NORTH)
            wy += value
        else if(dir === SOUTH)
            wy -= value
        else if(dir === EAST)
            wx += value
        else if(dir === WEST)
            wx -= value
        else if(dir === RIGHT) {
            while(value > 0) {
                const tmp = wy
                wy = -wx
                wx = tmp
                value -= 90
            }
        }
        else if(dir === LEFT) {
            while (value > 0) {
                const tmp = wy
                wy = wx
                wx = -tmp
                value -= 90
              }
        }
        else if(dir === FORWARD) {
            x += value * wx
            y += value * wy
        }
    }

    return Math.abs(x) + Math.abs(y)
}
console.time('Solution took... ')
const p1 = partOne(input)
const p2 = partTwo(input)
console.timeEnd('Solution took... ')
console.log(p1)
console.log(p2)