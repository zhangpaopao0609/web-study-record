const express = require('express');

const index = require('./routes/index');
const admin = require('./routes/admin');
const api = require('./routes/api');

const app = new express();

app.use("/", index);
app.use("/admin", admin);
app.use("/api", api);

const port = 6090;
app.listen(port, err => {
  if(err) throw err;
  console.log(`app start at ${port}`);
});