import Service from '@ember/service';

export default Service.extend({

  logFunctions: null,
  callbackMap: null,

  init() {
    this._super(...arguments);
    this.callbackMap = {};
    this.logFunctions = {
      info: window.console.info,
      debug: window.console.debug,
      trace: window.console.trace,
      error: window.console.error
    };

  },

  info(msg, ...args) {
    this._log('info', msg, args);
  },
  error(msg, ...args) {
    this._log('error', msg, args);
  },
  debug(msg, ...args) {
    this._log('debug', msg, args);
  },
  trace(msg, ...args) {
    this._log('trace', msg, args);
  },

  registerCallback(level, fn){
    this.get('callbackMap')[level] = fn;
  },

  _log(level, msg, args) {
    let logMethod = this.logFunctions[level];
    if (typeof logMethod === 'function') {
      logMethod(msg, ...args);
    }

    let callback = this.callbackMap[level];
    if (typeof callback === 'function') {
      callback(level, msg, ...args);
    }
  }
});
