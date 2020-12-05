const request = require('request');

setInterval(() => {
  request('http://localhost:6090', (error, response, body) => {
    console.log(`body: ${body}`);
  })
}, 1000);