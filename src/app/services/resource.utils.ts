import {Headers, RequestOptions} from 'angular2/http';
import {JwtService} from './jwt.service';

export function getAuthOptions(jwtService: JwtService): RequestOptions {
  const jwtToken = jwtService.getToken();
  const headers = new Headers({ 'Authorization': `Bearer ${jwtToken}` });
  const options = new RequestOptions({ headers: headers });
  return options;
}