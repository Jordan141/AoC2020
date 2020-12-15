const raw = require('fs').readFileSync(__dirname + '/input.txt', 'utf-8')
const input = Uint32Array.from(raw.split(',').map(Number))

function findNthElement(playUntil = 2020) {
    let prevValue = 0;
    const lastIndexOf = new Uint32Array(playUntil);
    let i = 0;
  
    for (i; i < input.length; i++) {
      prevValue = input[i]
      lastIndexOf[prevValue] = i + 1
    }
  
    for (i; i < playUntil; i++) {
      const prevIndex = lastIndexOf[prevValue] || -1
      lastIndexOf[prevValue] = i
      prevValue = prevIndex === -1 ? 0 : i - prevIndex
    }
  
    return prevValue
}

console.time('Time')
const resultA = findNthElement(2020)
const resultB = findNthElement(30000000)
console.timeEnd('Time')

console.log('Part A:', resultA)
console.log('Part B:', resultB)