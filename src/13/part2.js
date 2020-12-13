function parseInput(input) {
	const buses = input.split(',')
		.map((bus,index) => [bus,index])
		.filter(([bus]) => bus !== 'x')
		.map(([bus,index]) => [+bus,index]);
	return buses;
}

const modularMultiplicativeInverse = (a, modulus) => {
    const b = BigInt(a % modulus)

    for(let hipothesis = 1n; hipothesis <= modulus; hipothesis++) {
        if((b * hipothesis) % modulus == 1n) return hipothesis
    }

    return 1n
}

const solveCRT = (remainders, modules) => {
    const prod = BigInt(modules.reduce((acc, val) => acc * val, 1n))

    return modules.reduce((sum, mod, index) => {
        const p = BigInt(prod / mod)
        return sum + (remainders[index] * modularMultiplicativeInverse(p, mod) * p)
    }, 0n) % prod
}

function modulo(x, m) {
	while (x < 0) x += m;
	return x % m;
}


function run(buses) {
    const N = buses.map(([bus]) => BigInt(bus))
    const A = buses.map(([bus, offset]) => BigInt(modulo(-offset, bus)))
    return Number(solveCRT(A, N))
}

const input = parseInput('13,x,x,41,x,x,x,x,x,x,x,x,x,569,x,29,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,19,x,x,x,23,x,x,x,x,x,x,x,937,x,x,x,x,x,37,x,x,x,x,x,x,x,x,x,x,17')
console.time('Solving CRT in...')
const result = run(input)
console.timeEnd('Solving CRT in...')
console.log(result)