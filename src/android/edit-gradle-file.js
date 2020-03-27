const fs = require('fs');
const readline = require('readline');

module.exports = async function editGradleFile(filePath, find, replace, outputPath) {
  return new Promise((resolve) => {
    const updatedLines = [];
    let updated = false;

    //  If we don't specify an output path, use the input path (i.e. overwrite).
    const outputFilePath = outputPath || filePath;

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
      fs.writeFileSync(outputFilePath, updatedLines.join('\n'), 'utf-8');
      return resolve(updated);
    });
  });
};
