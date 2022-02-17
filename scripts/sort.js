const axios = require('axios');
const fs = require('fs');


async function parseOriginalData() {
  const start = 335669
  const end = 730666
  let assets = {}

  const files = await fs.readdirSync('./assets')

  for (f of files) {
    let data = await fs.readFileSync(`./assets/${f}`, 'utf8')
    data = JSON.parse(data)
    
    for(d of data) {
      const year = new Date(d.timestamp*1000).getFullYear()

      if (!assets[year]) {
        assets[year] = [d]
      } else {
        assets[year].push(d)
      }
    }
  }

  for(year of Object.keys(assets)) {
    const nfts = assets[year]

    nfts.sort((a, b) => a.timestamp - b.timestamp);

    await fs.writeFileSync(`./archive-by-year/${year}.json`, JSON.stringify(nfts))
  }
}

// parseOriginalData()

async function analyze() {
  const files = await fs.readdirSync('./archive-by-year')

  for (f of files) {
    let data = await fs.readFileSync(`./archive-by-year/${f}`, 'utf8')
    data = JSON.parse(data)

    console.log(f, data.length)
  }
}

analyze()