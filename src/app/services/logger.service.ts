import {Injectable} from 'angular2/core';

@Injectable()
export class Logger {
  constructor() {}

  public error(msg: string, optionalParams?: any[]): void {
    console.error(msg, ...optionalParams);
  }

  public log(msg: string, optionalParams?: any[]): void {
    console.log(msg, ...optionalParams);
  }
}