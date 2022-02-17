const axios = require('axios');
const fs = require('fs');


async function run(adr) {
  const resp = await axios.get(adr)
  console.log(resp);
}

address = 'https://dogeparty.xchain.io/api/asset/JOLLYROGER'

run(address)