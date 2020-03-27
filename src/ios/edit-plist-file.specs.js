const chai = require('chai');
const chaiFiles = require('chai-files');

const path = require('path');
const editPlistFile = require('./edit-plist-file');

const { expect } = chai;
const { file } = chaiFiles;

chai.use(chaiFiles);

describe('edit-plist-file', () => {
  it('should be able to edit a plist file', async () => {
    const inputPath = path.normalize('src/ios/test-files/Info-input.plist');
    const outputPath = path.normalize('src/ios/test-files/Info-output.plist');
    const expectedPath = path.normalize('src/ios/test-files/Info-expected.plist');

    const version = '2.3.4';
    const updated = await editPlistFile(inputPath, [{
      key: /CFBundleShortVersionString/,
      value: version,
    }], outputPath);


    expect(updated).to.eql(true);
    expect(file(outputPath)).to.equal(file(expectedPath));
  });
});
