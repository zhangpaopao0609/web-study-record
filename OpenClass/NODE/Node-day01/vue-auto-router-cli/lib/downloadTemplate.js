const { promisify } = require('util');

/**
 * @param {*} repo 从哪儿下载模板
 * @param {*} dest 下载到哪里
 */
const clone = async (repo, dest) => {
  const download = promisify(require('download-git-repo'));
  const ora = require('ora');
  const process = ora(`正在从${repo}仓库下载模板，请耐心等待！！！`);
  process.start();
  await download(repo, dest);
  process.succeed();
}

module.exports = clone;