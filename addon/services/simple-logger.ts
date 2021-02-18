import Service from '@ember/service';
// import {isNone} from '@ember/utils';

export default class SimpleLogger extends Service {

  // @ts-ignore
  private logFunctions: Record<string, (...args: any[])=>void>;
  // @ts-ignore
  private callbackMap: Record<string, (...args: any[])=>void>;

  init() {
    // @ts-ignore
    super.init(...arguments);


    this.callbackMap = {};

    let fallbackFn = window.console.log || function() {};
    this.logFunctions = {
      info: window.console.info || fallbackFn,
      debug: window.console.debug || fallbackFn,
      trace: window.console.trace || fallbackFn,
      error: window.console.error || fallbackFn,
      warn: window.console.warn || fallbackFn
    };

  }

  info(msg: string, ...args: any[]) {
    this.log('info', msg, args);
  }
  error(msg: string, ...args: any[]) {
    this.log('error', msg, args);
  }
  debug(msg: string, ...args: any[]) {
    this.log('debug', msg, args);
  }
  trace(msg: string, ...args: any[]) {
    this.log('trace', msg, args);
  }
  warn(msg: string, ...args: any[]) {
    this.log('warn', msg, args);
  }

  registerCallback(level: string, fn: (...args: any[])=>void) {
    this.callbackMap[level] = fn;
  }

  private log(level: string, msg: string, ...args: any[]) {
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
}
