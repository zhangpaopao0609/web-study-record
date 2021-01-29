const fs = require('fs');
const path = require('path');
const { resolve } = require('path');

exports.suffix = extname => {
  switch(extname) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'text/javascript';
    default:
      return 'text/html';
  }
};

exports.getMimePromise = extname => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, '../data/mime.json'), (err, data) => {
      if(err) {
        console.log(err);
        reject(err);
        return;
      }
      resolve(JSON.parse(data.toString())[extname]);
    });
  })
};

exports.getMimeSync = extname => {
  const data =  fs.readFileSync(path.join(__dirname, '../data/mime.json'));
  return JSON.parse(data.toString())[extname];
};
