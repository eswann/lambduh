const { expect } = require('chai')
const { pipe, pipeAsync } = require('../dist')
const { performance } = require('perf_hooks')

const testFunc1 = (rootText) => {
  return `${rootText} the cat and the fiddle`
}

const testFunc2 = (rootText) => {
  return `${rootText} the cow jumped over the moon`
}

describe('pipe', () => {
  it('Throws if no functions are passed', () => {
    expect(() => pipe()).to.throw(/requires at least one function/)
  })

  it('Can pipe one method', () => {
    const result = pipe(testFunc1)('hey diddle diddle')
    expect(result).to.equal('hey diddle diddle the cat and the fiddle')
  })

  it('Can pipe two methods', () => {
    const result = pipe(testFunc1, testFunc2)('hey diddle diddle')
    expect(result).to.equal('hey diddle diddle the cat and the fiddle the cow jumped over the moon')
  })

  it('Gives a time for piping sync', () => {
    const iterations = 10000
    let result
    const startTime = performance.now()
    for (let i = 0; i < iterations; i++) {
      result = pipe(testFunc1, testFunc2)('hey diddle diddle')
    }
    const elapsed = performance.now() - startTime
    console.log(`Performance of sync with ${iterations} iterations: ${elapsed}`)
    expect(result).to.exist
    console.log(result)
  })

  it('Gives a time for piping async on sync methods', async () => {
    const iterations = 10000
    let result
    const startTime = performance.now()
    for (let i = 0; i < iterations; i++) {
      result = await pipeAsync(testFunc1, testFunc2)('hey diddle diddle')
    }
    const elapsed = performance.now() - startTime
    console.log(`Performance of async on sync methods with ${iterations} iterations: ${elapsed}`)
    expect(result).to.exist
    console.log(result)
  })
})
