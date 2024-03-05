#!/usr/bin/env node
const commander = require('commander');

const init = require('../lib/init.js');

commander.version(require('../package.json').version);

commander
  .command('init <name>')
  .description('init project')
  .action(name => {
    init(name)
  });

commander.parse(process.argv);