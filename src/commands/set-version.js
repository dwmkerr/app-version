const chalk = require('chalk');
const getGlobalParameters = require('../parameters/get-global-parameters');
const findPlistFiles = require('../ios/find-plist-files');
const editPlistFile = require('../ios/edit-plist-file');
const findGradleFiles = require('../android/find-gradle-files');
const editGradleFile = require('../android/edit-gradle-file');

module.exports = async function setVersion(version, parameters) {
  const {
    searchRoot,
    platforms,
  } = getGlobalParameters(parameters);
  try {
    if (platforms.includes('ios')) {
      const plistFiles = await findPlistFiles(searchRoot);
      plistFiles.forEach(async (plistFile) => {
        await editPlistFile(plistFile, [{
          key: /CFBundleShortVersionString/,
          value: version,
        }]);
        console.log(`${chalk.green('ios')} ${plistFile}: CFBundleShortVersionString set to ${version}`);
      });
    }

    if (platforms.includes('android')) {
      const gradleFiles = await findGradleFiles(searchRoot);
      gradleFiles.forEach(async (gradleFile) => {
        const updated = await editGradleFile(gradleFile, /versionName\s+"[\d.]+"/, `versionName "${version}"`);
        if (updated) console.log(`${chalk.green('android')} ${gradleFile}: versionCode set to ${version}`);
      });
    }
  } catch (err) {
    console.error(chalk.red(`Error setting version: ${err.message}`));
    process.exit(1);
  }
};
