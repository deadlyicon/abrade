const abrade = require('.')

abrade.plugin('imdb', {
  url: 'http://www.imdb.com/find?q=$1&s=tt',
  entitySelector: '.findResult',
  properties: {
    title: node => extractTitle(node).trim(),
    year: node => extractYear(node),
    url: node => node.find('a[href]').attr('href'),
  }
})

const extractTitle = node =>
  node.find('.result_text').text()

const extractYear = node => {
  const matches = extractTitle(node).match(/\((\d\d\d\d)\)/)
  if (matches) return Number(matches[1])
}

// test

abrade.imdb('Star Wars').then(results => {
  console.log('IMDB Star Wars:', results)
})
