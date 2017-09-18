#!/usr/bin/env node
const fs = require('fs')
const program = require('commander')
const abrade = require('.')
const formatters = require('./formatters')

program
  .version(require('./package').version)
  .option('--json', 'print output as json')
  .option('--csv', 'print output as csv')
  .option('-f, --format [format]', 'set output format')
  .parse(process.argv);

program.format = program.format || (
  program.json ? 'json' :
  program.csv ? 'csv' :
  'table'
)

const formatter = formatters[program.format]

const [plugin, ...args] = program.args

if (!(plugin in abrade)){
  try{
    // enable loading globally installed npm modules
    module.paths.push(require('global-modules'))
    require(`abrade-${plugin}`)
  }catch(error){
    console.error(error)
    console.warn(`plugin "${plugin}" not found. Try 'npm i -g abrade-${plugin}'`)
    process.exit(1)
  }
}

abrade[plugin](...args).then(
  results => {
    process.stdout.write(
      formatter(results)+"\n"
    )
  },
  error => {
    console.error(error)
    process.exit(1)
  }
)




