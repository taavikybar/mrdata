const axios = require('axios');
const fs = require('fs');

// let address = 'https://dogeparty.xchain.io/api/markets';
// address = 'https://dogeparty.xchain.io/explorer/assets?type=0&start=0&length=1000000&_=1644339837736'


async function run(adr) {
  const resp = await axios.get(adr)
  console.log(resp.data);

  // fs.writeFile("data.json", JSON.stringify(resp.data), function (err) {
  //   if (err) {
  //     console.log(err);
  //   }
  // });
}

// run(address)

// A10086055906087762694|NPCPUNKS.NPC60

address = 'https://dogeparty.xchain.io/api/asset/TEST'

run(address)

return false

let counter = 3;
const amount = 1000

async function run(index) {
  const result = []
  const fileName = `result${index}.json`
  await fs.writeFileSync(fileName, '[')

  try {
    const data = await fs.readFileSync("data.json", 'utf8')
    const json = JSON.parse(data)
    const subset = json.data.slice(amount*(index-1), amount*index)

    subset.forEach(async d => {
      const name = d[1].split('|')[0]
      const address = `https://dogeparty.xchain.io/api/issuances/${name}`
      const resp = await axios.get(address)
      const filtered = resp.data.data.filter(d => d.quantity > 0)

      filtered.forEach(async d => {
        console.log(d.tx_index)
        // result.push(d)
        await fs.appendFileSync(fileName, JSON.stringify(d)+',')
      })
    })

    // await fs.writeFileSync(fileName, JSON.stringify(result))

    console.log('result',result)
  } catch (err) {
    console.error(err)
  }
}

async function all() {
  // for (let i = 8;i<30;i++) {
  //   console.log(i)
  //   run(i)
  //   await sleep(120000)
  // }
  run(30)
}

// all()


function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}