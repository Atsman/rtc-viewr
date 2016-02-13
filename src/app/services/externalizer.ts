import {Injectable, Inject} from 'angular2/core';
import {APP_CONFIG, Config} from '../app.config';

@Injectable()
export class Externalizer {
  private v: string = '/api/v1/';

  constructor(
    @Inject(APP_CONFIG) private config: Config
  ) {
  }

  public apiUrl(ext: string): string {
    return `${this.config.apiEndpoint}${this.v}${ext}`;
  }
}