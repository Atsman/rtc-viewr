import {Injectable} from 'angular2/core';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {JwtService} from './jwt.service';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {Logger} from './logger.service';
import {Externalizer} from './externalizer';
import {getAuthOptions} from './resource.utils';

@Injectable()
export class UserResource {
  constructor(
    private logger: Logger,
    private http: Http,
    private jwtService: JwtService,
    private externalizer: Externalizer) {
      this._usersUrl = externalizer.apiUrl('users');
    }

  private _usersUrl: String;

  public getMe(): Observable<User> {
    const options: RequestOptions = getAuthOptions(this.jwtService);
    return this.http
      .get(`${this._usersUrl}/me`, options)
      .map((res: Response) => res.json());
  }

  public getOne(id: string): Observable<User> {
    if(!id) {
      this.logger.error('UserResource - getUser, id param is required!');
      throw new Error('UserResource - getUser, id param is required!');
    }
    const options: RequestOptions = getAuthOptions(this.jwtService);
    return this.http
      .get(`${this._usersUrl}/${id}`, options)
      .map((res: Response) => res.json());
  }
}