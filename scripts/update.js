const axios = require('axios');
const fs = require('fs');

const base = './archive-by-year'

async function update() {
  const start = 335669
  const end = 730666

  const files = await fs.readdirSync(base)

  for (f of files) {
    console.log(f)
    let assets = []
    let data = await fs.readFileSync(`${base}/${f}`, 'utf8')
    data = JSON.parse(data)

    for (d of data) {
      const address = `https://dogeparty.xchain.io/api/asset/${d.asset}`
      const resp = await axios.get(address)
      
      assets.push(resp.data)
    }

    await fs.writeFileSync(`${base}/${f}`, JSON.stringify(assets))
  }
}

update()
