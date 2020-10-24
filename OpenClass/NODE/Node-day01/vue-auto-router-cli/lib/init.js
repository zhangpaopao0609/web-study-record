// 目标
const { promisify  } = require('util');
// 
const figlet = promisify(require('figlet'));
// 清空命令行
const clear = require('clear');
const chalk = require('chalk');
const open = require('open');

const clone = require('./downloadTemplate.js');

const log = content => console.log(chalk.green(content));

const spawn = (...args) => {
  const { spawn } = require('child_process');
  return new Promise(resolve => {
    const proc = spawn(...args);
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);
    proc.on('close', () => {
      resolve();
    })
  })
}

module.exports = async name => {
  // 打印欢迎界面
  clear();
  const data = await figlet('Arrow Welcome!');
  log(data);
  // 克隆项目
  await clone('github:Arrow-zb/vue-cli-template', name);
  // 安装依赖
  log('安装依赖！');
  await spawn('npm', ['install'], { cwd: `./${name}` });
  log(
    `
👌
================
已经安装完成了！！！
================
    `
  );
  // 打开浏览器
  open('http://localhost:8080');
  await spawn('npm', ['run serve'], { cwd: `./${name}`})
};