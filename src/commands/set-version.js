const chalk = require('chalk');
const getGlobalParameters = require('../parameters/get-global-parameters');
const findPlistFiles = require('../ios/find-plist-files');
const editPlistFile = require('./edit-plist-file');

module.exports = async function setVersion(version, parameters) {
  debugger;
  const {
    searchRoot,
    // platforms,
  } = getGlobalParameters(parameters);
  try {
    const plistFiles = await findPlistFiles(searchRoot);

    plistFiles.forEach(async (plistFile) => {
      await editPlistFile(plistFile, [{
        key: /CFBundleShortVersionString/,
        value: version,
      }]);
    });
  } catch (err) {
    console.error(chalk.red(`Error setting version: ${err.message}`));
    process.exit(1);
  }
};
