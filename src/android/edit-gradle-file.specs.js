const chai = require('chai');
const chaiFiles = require('chai-files');

const path = require('path');
const editGradleFile = require('./edit-gradle-file');

const { expect } = chai;
const { file } = chaiFiles;

chai.use(chaiFiles);

describe('edit-gradle-file', () => {
  it('should be able to edit a gradle file', async () => {
    const inputPath = path.normalize('src/android/test-files/build-input.gradle');
    const outputPath = path.normalize('src/android/test-files/build-output.gradle');
    const expectedPath = path.normalize('src/android/test-files/build-expected.gradle');

    const version = '2.3.4';
    const updated = await editGradleFile(inputPath, /versionName\s+"[\d.]+"/, `versionName "${version}"`, outputPath);

    expect(updated).to.eql(true);
    expect(file(outputPath)).to.equal(file(expectedPath));
  });
});
