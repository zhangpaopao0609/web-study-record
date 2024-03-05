const fs = require('fs');
const url = require('url');
const path = require('path');

const getMime = require('./getMime');

const initStatic = (req, res, staticPath="public") => {
  let { pathname } = url.parse(req.url);
  pathname = pathname === '/' ? '/index.html' : pathname;

  const filePath = path.join(__dirname, '..', staticPath, pathname);

  try {
    // 判断path对应的文件是否存在，存在就返回静态资源, 
    // 不存在的捕获错误，往下执行即可
    console.log(filePath);
    const data = fs.readFileSync(filePath);
    const mime = getMime(path.extname(pathname).slice(1));
    res.writeHead(200, {"Content-Type": `${mime}; charset=UTF-8`});
    res.end(data);
  } catch (error) {}
};

module.exports = initStatic;