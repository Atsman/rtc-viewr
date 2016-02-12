import {Injectable, Inject} from 'angular2/core';
import {UserResource} from './user.resource';
import {Action, UserLoaded, MeLoaded} from '../state/actions';
import {APP_STATE, DISPATCHER, AppState} from '../state/state';
import {User} from '../model/user';
import {Observer} from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    private userResource: UserResource,
    @Inject(DISPATCHER) private _dispatcher: Observer<Action>
  ) {}

  public getMe(): void {
    this.userResource.getMe().subscribe((user: User) => {
      this._dispatcher.next(new MeLoaded(user));
    });
  }

  public getUser(id: string): void {
    this.userResource.getUser(id).subscribe((user: User) => {
      this._dispatcher.next(new UserLoaded(user));
    });
  }
}