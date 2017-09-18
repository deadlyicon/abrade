const toCSV = require('csv-stringify/lib/sync')
const Table = require('cli-table2')

const formatters = {}

formatters.table = results => {
  if (results.length === 0){
    return "No results found.\n"
  }
  const props = Object.keys(results[0])

  const colWidths = props.map(prop => maxLength(results, prop) + 2)

  var table = new Table({
    head: props,
    colWidths: colWidths,
  })

  results.forEach(result =>
    table.push(
      props.map(prop => result[prop] || '')
    )
  )

  return table.toString()
}

formatters.json = results =>
  JSON.stringify(results, null, 2)

formatters.csv = results => {
  if (results.length === 0) return ''
  const props = Object.keys(results[0])
  return toCSV(props.concat(results))
}



module.exports = formatters

const maxLength = (results, prop) =>
  Math.max(
    ...results.map(result =>
      ((result[prop] || '')+'').length
    )
  )
