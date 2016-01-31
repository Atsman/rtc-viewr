/*
 * Angular 2 decorators and services
 */
import {Component, provide} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';
import {stateAndDispatcher} from './state/state';
import {MainComponent} from './components/main';
import {Logger} from './services/logger.service';
import {CONFIG, APP_CONFIG} from './app.config';
import {ChatService} from './services/chat/chat.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [...FORM_PROVIDERS, stateAndDispatcher, Logger, ChatService, provide(APP_CONFIG, {useValue: CONFIG})],
  directives: [ ...ROUTER_DIRECTIVES],
  pipes: [],
  styles: [],
  template: `
    <router-outlet></router-outlet>
  `
})
@RouteConfig([
  { path: '/', component: MainComponent, name: 'Index' },
  { path: '/**', redirectTo: ['Index'] }
])
export class App {
  public angularclassLogo: string = 'assets/img/angularclass-avatar.png';
  public name: string = 'Rtc viewer';
  public url: string = 'https://twitter.com/AngularClass';
  constructor() {}
}