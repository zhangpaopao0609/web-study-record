const http = require('http');
const fs = require('fs');
const path = require('path');
const chunk = [];
let size = 0;

const server = http.createServer((request, response) => {
  const { pathname } = require('url').parse(request.url);
  if (pathname === '/upload') {
    console.log('>>>>uploading......');
    const fileName = request.headers['file-name'] ? request.headers['file-name'] : 'abc.png';
    const outputFile = path.resolve(__dirname, fileName);
    const fis = fs.createWriteStream(outputFile);

    // 方式三： Buffer connect
    request.on('data', data => {
      chunk.push(data);
      size += data.length;
      console.log(data, size);
    });

    request.on('end', () => {
      console.log('end......');
      const buffer = Buffer.concat(chunk, size);
      size = 0;
      fs.writeFileSync(outputFile, buffer);
      response.end();
    })

    // 方式二： 流事件写入
    // request.on('data', data => {
    //   console.log('data', data);
    //   fis.write(data);
    // });
    // request.on('end', () => {
    //   fis.end();
    //   response.end();
    // });

    // 方式一： 流事件写入
    // request.pipe(fis);
    // response.end();
    // console.log('>>>>>end......');
  } else {
    const filename = pathname === '/' ? 'index.html' : pathname.substring();
    const type = (_type => {
      switch (_type) {
        case 'html':
        case 'htm': return 'text/html charset=UTF-8'
        case 'js': return 'application/javascript charset=UTF-8'
        case 'css': return 'text/css charset=UTF-8'
        case 'txt': return 'text/plain charset=UTF-8'
        case 'mainfest': return 'text/cahe-mainfest charset=UTF-8'
        default: return 'application/octet-stream'
      }
    })(filename.substring(filename.lastIndexOf('.') + 1));

    fs.readFile(path.resolve(__dirname, filename), (err, content) => {
      if (err) {
        response.writeHead(404, { 'Content-type': 'text/plain charset=UTF-8' });
        response.write(err.message);
      } else {
        response.writeHead(200, { 'Content-Type': type });
        response.write(content);
      }
      response.end();
    })
  }
});

server.listen(6090);