const http = require('http');

const router = require('./utils/router');

const app = http.createServer(router);

const port = 6090;
app.listen(port, err => {
  if(err) throw err;
  console.log(`app start at ${port}`);
});