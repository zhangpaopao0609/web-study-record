const fs = require('fs');
const url = require('url');
const path = require('path');
const { getMimeSync } = require('./suffix');

exports.static = (req, res, staticPath) => {
  let { pathname } = url.parse(req.url);
  pathname = pathname === '/' ? '/index.html' : pathname;
  
  if(pathname !== '/favicon.ico') {
    try {
      const data = fs.readFileSync(path.join(__dirname, '../', staticPath, pathname)); 
      if(data) {
        const mime = getMimeSync(path.extname(pathname));
        res.writeHead(200, {'Content-Type' : `${mime}; charset="utf-8"`});
        res.end(data);
      }
    } catch (err) {
      // console.log(err);  
    };
  };
};