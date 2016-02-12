import {Injectable} from 'angular2/core';

@Injectable()
export class JwtService {
  constructor() { }

  public getToken() {
    let token = localStorage.getItem('jwt');
    if(token) {
      token = token.split('"').join('');
    }
    return token;
  }
}