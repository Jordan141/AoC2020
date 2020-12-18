// https://en.wikipedia.org/wiki/Operator-precedence_parser#Alternative_methods
const input = require('fs').readFileSync(__dirname + '/input.txt', 'utf-8').split('\n')
const PARENS_RE = /\(([^()]+)\)/
const ORDERED_RE = /(\d+) (\*|\+) (\d+)/
const ADD_RE = /(\d+) \+ (\d+)/
const MULT_RE = /(\d+) \* (\d+)/

const transformer = (re, replacer) => str => {
    let match = null
    while((match = str.match(re)) !== null) {
        str = str.replace(match[0], replacer(match))
    }
    return str
}

const pipe = (str, ...args) => args.reduce((acc, curr) => curr(acc), str)

const evaluate = (expr, advanced = false) => parseInt(
    advanced
        ? pipe(
            expr,
            transformer(PARENS_RE, ([_, str]) => evaluate(str, advanced)),
            transformer(ADD_RE, ([_, a, b]) => parseInt(a) + parseInt(b)),
            transformer(MULT_RE, ([_, a, b]) => parseInt(a) * parseInt(b))
        ) : pipe (
            expr,
            transformer(PARENS_RE, ([_, str]) => evaluate(str, advanced)),
            transformer(ORDERED_RE, ([match]) => eval(match))
        )
)
console.time('Solution took...')
const result = input.reduce((acc, curr) => ({
    p1: (acc.p1 || 0) + evaluate(curr),
    p2: (acc.p2 || 0) + evaluate(curr, true) 
}), {})
console.timeEnd('Solution took...')
console.log(result)