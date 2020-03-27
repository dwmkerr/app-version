const fs = require('fs');
const readline = require('readline');

module.exports = async function editPlistFile(filePath, keypairs, outputPath) {
  return new Promise((resolve) => {
    const updatedLines = [];

    //  If we don't specify an output path, use the input path (i.e. overwrite).
    const outputFilePath = outputPath || filePath;

    //  Line by line, we'll be looking for keypairs.
    let newValue = null;
    let currentLineIndex = 0;
    let updateLineIndex = -1;
    let updated = false;

    const readInterface = readline.createInterface({
      input: fs.createReadStream(filePath),
    });

    readInterface.on('line', (line) => {
      // assume we are not changing the next line...
      keypairs.forEach(({ key, value }) => {
        if (key.test(line)) {
          newValue = value;
          updateLineIndex = currentLineIndex + 1;
        }
      });

      //  Add the updated line value, OR the original line.
      if (currentLineIndex === updateLineIndex) {
        updatedLines.push(line.replace(/<string>.*<\/string>/, `<string>${newValue}</string>`));
        updateLineIndex = -1;
        updated = true;
      } else {
        updatedLines.push(line);
      }

      //  Update the line index.
      currentLineIndex += 1;
    });

    //  When we've finished reading we can write the updated lines back to the file.
    readInterface.on('close', () => {
      updatedLines.push(''); // end the file with a newline as is standard
      fs.writeFileSync(outputFilePath, updatedLines.join('\n'), 'utf-8');
      return resolve(updated);
    });
  });
};
