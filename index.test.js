const abrade = require('.')

abrade.plugin('imdb', {
  url: 'http://www.imdb.com/find?q=$1?s=tt',
  entity: {
    selector: '.findResult',
    properties: {
      title: {
        selector: '.result_text',
      },
      url: {
        selector: 'a[href]',
        attr: 'href',
      }
    }
  }
})

abrade.imdb('Star Wars').then(results => {
  console.log('IMDB Star Wars:', results)
})
