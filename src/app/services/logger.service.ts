import {Injectable} from 'angular2/core';

@Injectable()
export class Logger {
  constructor() {}

  public log(msg: string): void {
    console.log(msg);
  }
}