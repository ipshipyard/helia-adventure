#!/usr/bin/env node

const workshopper = require('workshopper-adventure')

const workshop = workshopper({
  appDir: __dirname,
  languages: ['en'],
  title: 'Helia Adventure',
  exerciseDir: './exercises'
})

workshop.addAll(require('./exercises/menu.json'))
workshop.execute(process.argv.slice(2))

process.on('unhandledRejection', error => {
  // eslint-disable-next-line no-console
  console.error(error.stack ? error.stack : error.toString())
  throw error
})
