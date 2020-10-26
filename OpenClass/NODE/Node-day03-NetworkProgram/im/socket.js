const net = require('net');
const chatServer = net.createServer();

const clientList = [];

chatServer.on('connection', client => {
  client.write('Hi!\n');
  clientList.push(client);
  client.on('data', data => {
    console.log('receive: ', data.toString());
    clientList.forEach(v => {
      v.write(data);
    })
  });
});

chatServer.listen(6090, err => {
  if (err) {
    console.log('启动失败！');
  } else {
    console.log(`启动成功： 6090`);
  }
});
