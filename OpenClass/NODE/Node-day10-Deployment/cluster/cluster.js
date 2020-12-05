const cluster = require('cluster');
const os = require('os');
const process = require('process');

const numCPUs = os.cpus().length;
const workers = {};

if(cluster.isMaster) {
  cluster.on('exit', (worker, code, signal) => {
    console.log(`工作进程错误。。。重启！`);
    delete workers[worker.process.pid];
    worker = cluster.fork();
    workers[worker.process.pid] = worker;
  })
  // 主进程
  for (let i = 0; i < numCPUs; i++) {
    const worker = cluster.fork();
    console.log(`init ...pid ${worker.process.pid}`);
    workers[worker.process.pid] = worker;
  }
}else {
  const app = require('./app');
  app.listen(6090);
};

// 当主进程关闭时，关闭所有子进程
process.on('SIGTERM', () => {
  for (const pid in workers) {
    process.kill(pid);
  }
  process.exit(0);
});

require('./test');

