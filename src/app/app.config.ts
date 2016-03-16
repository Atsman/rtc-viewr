import {OpaqueToken} from 'angular2/core';

export interface Config {
  apiEndpoint: string;
  chatSocketUrl: string;
}

export const CONFIG: Config = {
  apiEndpoint: 'https://192.168.1.103:8123',
  chatSocketUrl: 'https://192.168.1.103:8123/chat'
};

export const APP_CONFIG = new OpaqueToken('app.config');
