/*
 * Angular 2 decorators and services
 */
import {Component, provide} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';
import {MainComponent} from './components/main';
import {Logger} from './services/logger.service';
import {CONFIG, APP_CONFIG} from './app.config';
import {ChatService} from './services/chat.service.ts';
import {AppSocket} from './services/app.socket.ts';
import {JwtService} from './services/jwt.service';
import {UserResource} from './services/user.resource';
import {reduxProviders} from './redux/redux.providers';
import {Externalizer} from './services/externalizer';
/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [
    ...FORM_PROVIDERS, ...reduxProviders, Logger, AppSocket,
    ChatService, JwtService, UserResource, Externalizer,
    provide(APP_CONFIG, {useValue: CONFIG})
  ],
  directives: [MainComponent],
  pipes: [],
  styles: [],
  template: `
    <main></main>
  `
})
export class App {
  public angularclassLogo: string = 'assets/img/angularclass-avatar.png';
  public name: string = 'Rtc viewer';
  public url: string = 'https://twitter.com/AngularClass';
  constructor() {}
}
