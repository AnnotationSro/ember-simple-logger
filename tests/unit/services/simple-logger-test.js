import {
  module,
  test
} from 'qunit';
import {
  setupTest
} from 'ember-qunit';

module('Unit | Service | simple-logger', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let service = this.owner.lookup('service:simple-logger');
    assert.ok(service);
  });

  test('it registers callback', function(assert) {
    let service = this.owner.lookup('service:simple-logger');
    let callbackCalled = 0;
    service.registerCallback('info', function() {
      callbackCalled++;
    });
    service.info('hello');
    service.trace('some other log');
    assert.equal(callbackCalled, 1);
  });
});
