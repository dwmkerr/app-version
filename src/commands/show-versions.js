const chalk = require('chalk');
const getGlobalParameters = require('../parameters/get-global-parameters');
const findPlistFiles = require('../ios/find-plist-files');

module.exports = async function showVersions(parameters) {
  debugger;
  const {
    searchRoot,
    // platforms,
  } = getGlobalParameters(parameters);
  try {
    const plistFiles = await findPlistFiles(searchRoot);

    plistFiles.forEach((plistFile) => console.log(`iOS Plist File: ${plistFile}`));
  } catch (err) {
    console.error(chalk.red(`Error getting versions: ${err.message}`));
    process.exit(1);
  }
};
