#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const pack = require('../package.json');
const showVersions = require('../src/commands/show-versions');
const setVersion = require('../src/commands/set-version');

//  Create the program, ensure that an 'action' is mandatory.
program
  .version(pack.version)
  .arguments('<command>')
  .option('-s, --search [optional]', 'The folder to search from.', './')
  .option('-p, --platforms [optional]', 'The platforms to generate icons for.', 'android,ios');

program
  .command('show-versions')
  .description('shows versions')
  .action(showVersions);

program
  .command('set-version <version>')
  .description('sets the version')
  .action(setVersion);

//  Extend the help with some examples.
program.on('--help', () => {
  console.log('');
  console.log('Examples:');
  console.log('');
  console.log('    $ app-version set-version 1.2.3');
  console.log('');
});

const main = async () => {
  try {
    //  Parse the arguments. If we have no subcommand, show the help.
    await program.parseAsync(process.argv);
    if (program.args.length === 0) {
      program.help();
    }
  } catch (err) {
    console.log(chalk.red(`Error running command: ${err.message}`));
  }
};

main();
