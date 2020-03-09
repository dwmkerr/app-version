const assert = require('assert');
const getGlobalParameters = require('./get-global-parameters');

describe('getGlobalParameters', () => {
  function validParameters() {
    return {
      searchRoot: './',
      platforms: 'android,ios',
    };
  }

  it('should provide a default search root', () => {
    const params = validParameters();
    delete params.searchRoot;
    const parameters = getGlobalParameters(params);
    assert.strictEqual(parameters.searchRoot, './');
  });

  it('should provide a default set of platforms', () => {
    const params = validParameters();
    delete params.platforms;
    const parameters = getGlobalParameters(params);
    assert.deepStrictEqual(parameters.platforms, ['android', 'ios']);
  });

  it('should reject invalid platforms', () => {
    const params = validParameters();
    params.platforms = 'android,jos';
    assert.throws(() => getGlobalParameters(params), /jos.*not a valid platform/);
  });
});
