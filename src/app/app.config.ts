import {OpaqueToken} from 'angular2/core';

export interface Config {
  apiEndpoint: string;
  chatSocketUrl: string;
}

export const CONFIG: Config = {
  apiEndpoint: 'http://localhost:3000',
  chatSocketUrl: 'https://localhost:8123/chat'
}

export const APP_CONFIG = new OpaqueToken('app.config');
