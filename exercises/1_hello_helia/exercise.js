const exercise = require('workshopper-exercise')()
const verifyProcessor = require('workshopper-verify-processor')
const { loadSolution } = require('../../lib/utils.js')


exercise.addVerifyProcessor(verifyProcessor(exercise, async (test) => {
  const { default: solutionFn } = await loadSolution(exercise.args[0])

  await test.truthy(typeof solutionFn === 'function', 'default_export_a_function')

  const cid = await solutionFn()

  await test.equals(cid.toString(), 'bagaaieraybluse4e46em46yyfg4r2juk2hcv6sum376qg53hxggczhjjwdia', 'correct_cid')
}))

module.exports = exercise