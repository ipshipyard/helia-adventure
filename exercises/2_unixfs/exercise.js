const exercise = require('workshopper-exercise')()
const verifyProcessor = require('workshopper-verify-processor')
const { loadSolution } = require('../../lib/utils.js')


exercise.addVerifyProcessor(verifyProcessor(exercise, async (test) => {
  const { default: solutionFn } = await loadSolution(exercise.args[0])

  await test.truthy(typeof solutionFn === 'function', 'default_export_a_function')

  const cid = await solutionFn()

  await test.equals(cid.toString(), 'bafybeidqsbzrliptdmca5d4cc2yc5qlpefx4svlu63ni6uiefvmv45ywtm', 'correct_cid')
}))

module.exports = exercise