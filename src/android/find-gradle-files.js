const { find } = require('@dwmkerr/node-utils');

//  Given a search root, finds all build.gradle files.
module.exports = async function findGradleFiles(searchRoot) {
  return find(searchRoot, (file, stat) => {
    //  exclude node modules from the search.
    if (file.match(/node_modules/)) return false;

    //  Only grab build.gradle files.
    return file.match(/build.gradle/) && !stat.isDirectory();
  });
};
