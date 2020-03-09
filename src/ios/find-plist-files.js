const { find } = require('@dwmkerr/node-utils');

//  Given a search root, finds all iOS iconsets.
module.exports = async function findPlistFiles(searchRoot) {
  return find(searchRoot, (file, stat) => {
    //  exclude node modules from the search.
    if (file.match(/node_modules/)) return false;

    //  Only grab Info.plist files.
    return file.match(/Info.plist/) && !stat.isDirectory();
  });
};
