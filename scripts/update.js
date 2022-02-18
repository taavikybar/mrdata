const axios = require('axios');
const fs = require('fs');

const base = './archive'

async function update() {
  let data = await fs.readFileSync(`${base}/parsed-2014.json`, 'utf8')
  data = JSON.parse(data)
  const assets = []

  for (d of data) {
    const address = `https://dogeparty.xchain.io/api/asset/${d.asset}`
    const resp = await axios.get(address)

    assets.push(resp.data)

    await fs.writeFileSync(`${base}/updated-2014.json`, JSON.stringify(assets))
    console.log(`Updated ${d.asset}`)
  }
}

update()
