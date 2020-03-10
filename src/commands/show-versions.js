const chalk = require('chalk');
const getGlobalParameters = require('../parameters/get-global-parameters');
const findPlistFiles = require('../ios/find-plist-files');
const findGradleFiles = require('../android/find-gradle-files');

module.exports = async function showVersions(parameters) {
  const {
    searchRoot,
    // platforms,
  } = getGlobalParameters(parameters);
  try {
    const plistFiles = await findPlistFiles(searchRoot);
    plistFiles.forEach((plistFile) => console.log(`${chalk.green('ios')} Plist File: ${plistFile}`));
    const gradleFiles = await findGradleFiles(searchRoot);
    gradleFiles.forEach((gradleFile) => console.log(`${chalk.green('android')} Gradle File: ${gradleFile}`));
  } catch (err) {
    console.error(chalk.red(`Error getting versions: ${err.message}`));
    process.exit(1);
  }
};
