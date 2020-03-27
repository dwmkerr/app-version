const fs = require('fs');
const readline = require('readline');

module.exports = async function editGradleFile(filePath, find, replace) {
  return new Promise((resolve) => {
    const updatedLines = [];
    let updated = false;

    const readInterface = readline.createInterface({
      input: fs.createReadStream(filePath),
    });

    readInterface.on('line', (line) => {
      if (find.test(line)) {
        updatedLines.push(line.replace(find, replace));
        updated = true;
      } else {
        updatedLines.push(line);
      }
    });

    //  When we've finished reading we can write the updated lines back to the file.
    readInterface.on('close', () => {
      updatedLines.push(''); // end the file with a newline as is standard
      fs.writeFileSync(filePath, updatedLines.join('\n'), 'utf-8');
      return resolve(updated);
    });
  });
};
