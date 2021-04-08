import { pipeAsync } from './pipe-async'
import { FunctionTypes } from './util/type-util'
import AsyncFunction = FunctionTypes.AsyncFunction

/**
 * Performs right-to-left function composition on async code. The rightmost function may have
 * any arity; the remaining functions must be unary.
 * Function is wrapped in error handling and metrics, set logging to debug for timers
 * @param fns The functions to compose
 * @return Returns a composed function that accepts the args to kick off the pipe
 */
export function composeAsync (...fns: Function[]): AsyncFunction {
  if (fns.length === 0) {
    throw new Error('compose-async requires at least one function')
  }
  const reversed = fns.splice(0).reverse()
  return pipeAsync(...reversed)
}
