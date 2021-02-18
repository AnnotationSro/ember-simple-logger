import Service from '@ember/service';
export default class SimpleLogger extends Service {
    private logFunctions;
    private callbackMap;
    init(): void;
    info(msg: string, ...args: any[]): void;
    error(msg: string, ...args: any[]): void;
    debug(msg: string, ...args: any[]): void;
    trace(msg: string, ...args: any[]): void;
    warn(msg: string, ...args: any[]): void;
    registerCallback(level: string, fn: (...args: any[]) => void): void;
    private log;
}
