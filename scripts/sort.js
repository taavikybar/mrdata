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

    for (d of data) {
      const year = new Date(d.timestamp * 1000).getFullYear()

      if (!assets[year]) {
        assets[year] = [d]
      } else {
        assets[year].push(d)
      }
    }
  }

  for (year of Object.keys(assets)) {
    const nfts = assets[year]

    nfts.sort((a, b) => a.timestamp - b.timestamp);

    await fs.writeFileSync(`./archive-by-year/${year}.json`, JSON.stringify(nfts))
  }
}

// parseOriginalData()

async function analyze() {
  let data = await fs.readFileSync(`./archive-by-year/2014.json`, 'utf8')
  data = JSON.parse(data)
  const locked = []

  for (d of data) {
    // if (d.locked) {
    //   locked.push(d)
    // }

    if (parseInt(d.quantity) >= 10
      && parseInt(d.quantity) <= 2000
      && d.status === 'valid') {
      locked.push(d)
    }
  }

  await fs.writeFileSync(`./archive/parsed-2014.json`, JSON.stringify(locked))

  console.log(locked.length)
}

// analyze()

console.log(new Date(1408458240000))