
# [Abrade](http://www.dictionary.com/browse/abrade)

Scrape all the things.


Abrade allows you to describe resources available on
a website.



## Usage


```js
const abrade = require('abrade')


abrade
  .get('http://somesite.com')
  .extract($ => {
    // uses cheerio
    $('.titles a[href]')

  })


require('abrade-imdb')

abrade.imdb.search('')



// You can swap out the method abrade uses to
// make HTTP requests.
// This is the default
abrade.request = require('request')

```



## Plugins

- google - google.com
- imdb - imdb.com
- thepiratebay - thepiratebay.org
- cinesift - cinesift.com


## CLI Usage

```bash
$ npm i -g abrade abrade-imdb abrade-google

$ abrade imdb "Star Wars"
$ abrade google "Star Wars"
```

Optionally store auth information

```bash
abrade cinesift login -u username -p password
```

