const http = require('http');
const fs = require('fs');

http.createServer((request, response) => {
  // console.log('there is a request');
  // console.log('request' ,getPrototypeChain(request));
  // console.log('response', getPrototypeChain(response));
  // response.end('hello node arrow');
  const {url, method, headers} = request;
  console.log('url', url);
  if(url === '/' && method === 'GET') {
    fs.readFile('./index.html', (err, data) => {
      if(err) {
        response.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
        response.end('500 服务器错误！');
        return;
      }
      response.statusCode = 200;
      response.setHeader('Content-type', 'text/html');
      response.end(data);
    })
  }else if(url === '/users' && method === 'GET') {
    response.writeHead(200, {'Content-Type': 'application/json'});
    // response.end(JSON.stringify([{name: 'arrow'}]));
    response.end(JSON.stringify([{name: 'arrow'}]));
  } else if(method === 'GET' && headers.accept.indexOf('image/*') !== -1) {
    // 流
    console.log(url);
    fs.createReadStream(`./${url}`).pipe(response);
  }  
})
.listen(6090, (err) => {
  if (err) {
    console.log('服务启动 6090 失败！');
  } else {
    console.log('服务启动 6090 成功！');
  }
});

// 打印原型链
function getPrototypeChain(obj) {
  const prototypeChain = [];
  while(obj = Object.getPrototypeOf(obj)) {
    prototypeChain.push(obj)
  } 
  return prototypeChain;
}

