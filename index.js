const qs = require('qs')
const cheerio = require('cheerio')
const request = require('superagent')
require('superagent-as-promised')(request)

const abrade = {}
module.exports = abrade


abrade.url = (url, query) =>
  query ? `${url}?${qs.stringify(query)}` : url


abrade.request = () =>
  request

abrade.plugins = []
abrade.plugin = (name, spec) => {
  abrade.plugins.push(name)
  return abrade[name] = function(...argv){
    let url = spec.url.replace('$1', encodeURIComponent(argv[0]))
    return request.get(url).then(response => {
      const $ = cheerio.load(response.text)
      const entities = $(spec.entitySelector).toArray().map((node) => {
        node = $(node)
        const entity = {}
        Object.entries(spec.properties).forEach(([prop, extractor])=> {
          entity[prop] = extractor(node)
        })
        return entity
      })
      return entities
    })
    // console.log(`plugin ${name} ${argv}`, spec)
  }
}


