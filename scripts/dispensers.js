require('dotenv').config()
const axios = require('axios');
const fs = require('fs');
const c = require('../constants')
const log = require('../helpers/log')
const email = require('../helpers/email')

const DIR = './dispensers'
const MS_IN_MIN = 60000

async function check() {
  for (asset of c.assetsToCheck) {
    log(`Checking ${asset}`)
    let existing = await fs.readFileSync(`${DIR}/${asset}.json`, 'utf8')
    existing = JSON.parse(existing)

    const address = `https://dogeparty.xchain.io/api/dispensers/${asset}`
    const resp = await axios.get(address)
    const dispensers = resp.data.data

    if (existing.length === dispensers.length) {
      log(`${asset} no new dispensers`)
      continue
    }

    const existingBlocks = existing.map(e => e.block_index)
    const newDispensers = dispensers.filter(d => !existingBlocks.includes(d.block_index))

    newDispensers.forEach(d => {
      const price = parseInt(d.satoshirate)
      log(`${asset} new dispenser for ${price} DOGE`)

      email.sendMail(
        `New ${asset} dispenser`, `Quantity: ${d.give_quantity}\nRemaining: ${d.give_remaining}\nPrice: ${price} DOGE\nPrice: $${price * c.dogePrice} \n\nhttps://dogeparty.xchain.io/tx/${d.tx_hash}`
      )
    })

    await fs.writeFileSync(`${DIR}/${asset}.json`, JSON.stringify(dispensers))
  }


  log(`All checked, waiting ${c.delayInMin}min`)
}

async function wrapped() {
  try {
    await check()
  } catch (e) {
    console.log(`Error thrown: ${e}`)
  }
}

async function run() {
  wrapped()
  setInterval(wrapped, c.delayInMin * MS_IN_MIN)
}

run()
