import {Injectable} from 'angular2/core';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {JwtService} from './jwt.service';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {Logger} from './logger.service';
import {Externalizer} from './externalizer';
import {getAuthOptions} from './resource.utils.ts';
import {Interview} from '../model/interview';

@Injectable()
export class InterviewResource {
  private resourceUrl: string;

  constructor(
    private logger: Logger,
    private http: Http,
    private jwtService: JwtService,
    private externalizer: Externalizer
  ) {
     this.resourceUrl = externalizer.apiUrl('interview');
  }

  public getOne(id: string): Observable<Interview> {
    const options: RequestOptions = getAuthOptions(this.jwtService);
    return this.http
      .get(`${this.resourceUrl}/${id}`, options)
      .map((res: Response) => res.json());
  }

  public update(id: string, data: any) {
    const options: RequestOptions = getAuthOptions(this.jwtService);
    options.headers.append('Content-Type', 'application/json');
    return this.http.put(`${this.resourceUrl}/${id}`, JSON.stringify(data), options);
  }

  public start(id: string) {
    return this.update(id, {status: 'InProgress'}).subscribe(() => {
      console.log("started");
    });
  }

  public hangup(id: string) {
    return this.update(id, {status: 'Completed'}).subscribe(() => {
      console.log("hangup");
    });
  }
}