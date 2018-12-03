import Controller from '@ember/controller';
import {
  inject as service
} from '@ember/service';

export default Controller.extend({
  simpleLogger: service('simple-logger'),
  logText: 'ja som text',


  init() {
    this._super(...arguments);
    this.get('simpleLogger').registerCallback('info', function(level, msg, args){alert(`logged - level: ${level}; msg: ${msg}, arguments: ${args}`)});
  },

  actions: {
    actionLogInfo() {
      this.get('simpleLogger').info(this.get('logText'));
    },
    actionLogError() {
      this.get('simpleLogger').error(this.get('logText'));
    },
    actionLogInfoArgs() {
      this.get('simpleLogger').info(this.get('logText'), 1, 2, 3, {
        a: 2
      });
    }
  }
});
