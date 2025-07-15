const exercise = require('workshopper-exercise')()
const verifyProcessor = require('workshopper-verify-processor')
const { loadSolution } = require('../../lib/utils.js')

exercise.addVerifyProcessor(verifyProcessor(exercise, async (test) => {
  const { default: solutionFn } = await loadSolution(exercise.args[0])

  await test.truthy(typeof solutionFn === 'function', 'default_export_a_function')

  const cid = await solutionFn()

  await test.equals(cid.toString(), 'bafybeiaj2vh45p4aluwefp4yuxpytjhw255ljba5keyohvp3oa3edbyssa', 'correct_cid')
}))

module.exports = exercise
