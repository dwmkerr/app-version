const { expect } = require('chai');
const index = require('./index');

describe('index', () => {
  it('should expose the expected apis', () => {
    expect(index.setVersion).to.be.a('function');
    expect(index.showVersions).to.be.a('function');
  });
});
