const http = require('http');

const server = http.createServer((request, response) => {
  Math.random() > 0.5 ? aa() : "2";
  
  response.end('Hello ...!');
});

if(!module.parent) {
  const port = 6090;
  server.listen(port);
  console.log(`app start at ${port}`)
}else {
  module.exports = server;
}