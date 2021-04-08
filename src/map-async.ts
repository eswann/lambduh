import { executeAsync } from './util/runner'

/**
 * Runs all the passed args through the map in metrics and error handling,
 * set logging to debug for timers
 * @param fn The function to apply to all passed arguments
 * @param args The args to apply the function to.
 * @return Returns an aggregate promise of the function applied to all passed args, using Promise.all
 */
export function mapAsync (fn: Function, args: any[]): Promise<any[]> {
  if (!fn || typeof fn !== 'function') {
    throw new Error('map-async requires a function to be passed')
  }
  if (!args) {
    return Promise.resolve([])
  }
  if (!Array.isArray(args)) {
    throw new Error('map-async requires args to be passed as an array')
  }
  if (args.length === 0) {
    return Promise.resolve([])
  }
  return Promise.all(args.map((arg) => executeAsync(fn, arg)))
}
