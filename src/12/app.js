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

console.log(partOne(input))