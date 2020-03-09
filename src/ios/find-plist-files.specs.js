const { expect } = require('chai');
const path = require('path');
const findPlistFiles = require('./find-plist-files');

describe.only('find-plist-files', () => {
  it('should not find any iconsets in the node_modules/ folder', async () => {
    const iconsets = await findPlistFiles('./node_modules');
    expect(iconsets.length).to.equal(0);
  });

  it('should be able to find the Plist file in the Native Sample App', async () => {
    const plistFiles = await findPlistFiles('./test-projects/SampleNativeApp');
    expect(plistFiles.length).to.equal(1);
    expect(plistFiles).to.include(path.normalize('test-projects/SampleNativeApp/SampleNativeApp/Info.plist'));
  });
});
