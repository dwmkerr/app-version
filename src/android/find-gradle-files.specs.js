const { expect } = require('chai');
const path = require('path');
const findGradleFiles = require('./find-gradle-files');

describe('find-gradle-files', () => {
  it('should not find any build.gradle files in the node_modules/ folder', async () => {
    const iconsets = await findGradleFiles('./node_modules');
    expect(iconsets.length).to.equal(0);
  });

  it('should be able to find the build.gradle files in the Sample Android App', async () => {
    const plistFiles = await findGradleFiles('./test-projects/SampleAndroidApp');
    expect(plistFiles.length).to.equal(2);
    expect(plistFiles).to.include(path.normalize('test-projects/SampleAndroidApp/build.gradle'));
    expect(plistFiles).to.include(path.normalize('test-projects/SampleAndroidApp/app/build.gradle'));
  });
});
