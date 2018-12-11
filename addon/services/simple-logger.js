import Service from '@ember/service';
// import {isNone} from '@ember/utils';

export default Service.extend({

  logFunctions: null,
  callbackMap: null,

  init() {
    this._super(...arguments);


    this.callbackMap = {};

    let fallbackFn = window.console.log || function() {};
    this.logFunctions = {
      info: window.console.info || fallbackFn,
      debug: window.console.debug || fallbackFn,
      trace: window.console.trace || fallbackFn,
      error: window.console.error || fallbackFn,
      warn: window.console.warn || fallbackFn
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
  warn(msg, ...args) {
    this._log('warn', msg, args);
  },

  registerCallback(level, fn) {
    this.get('callbackMap')[level] = fn;
  },

  _log(level, msg, args) {
    let logMethod = this.logFunctions[level];
    if (typeof logMethod === 'function') {
      try {
        logMethod(msg);
      } catch (e) {
        //error in Internet Explorer - this happens when DevTools is closed -> https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/14495220/
        window.console.log('Fallback Logger: ' + msg, ...args);
      }
    }
    let callback = this.callbackMap[level];
    if (typeof callback === 'function') {
      callback(level, msg, ...args);
    }
  }
});
