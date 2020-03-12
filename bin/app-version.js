#!/usr/bin/env node

const program = require('commander');
// const chalk = require('chalk');
const pack = require('../package.json');
const showVersions = require('../src/commands/show-versions');
const setVersion = require('../src/commands/set-version');

//  Create the program, ensure that an 'action' is mandatory.
program
  .version(pack.version);

program
  .command('show-versions')
  .description('shows versions')
  .option('-s, --search-root [optional]', 'The folder to search from.', './')
  .option('-p, --platforms [optional]', 'The platforms to show versions for.', 'android,ios')
  .action(showVersions);

program
  .command('set-version <version>')
  .description('sets the version')
  .option('-s, --search-root [optional]', 'The folder to search from.', './')
  .option('-p, --platforms [optional]', 'The platforms to set versions for.', 'android,ios')
  .action(setVersion);

//  Extend the help with some examples.
program.on('--help', () => {
  console.log('');
  console.log('Examples:');
  console.log('');
  console.log('    $ app-version set-version 1.2.3');
  console.log('');
});

//  Show help for unknown commands.
program.on('command:*', () => program.help());

//  Parse the arguments. If we have no subcommand, show the help.
program.parse(process.argv);

// Note: this doesn't work, because if we run 'show-versions', then the args length
// is zero.
// if (program.args.length === 0) {
//   program.help();
// }
