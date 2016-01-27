import 'reflect-metadata';
import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from './app.component';

function main() {
  bootstrap(AppComponent);
}

document.addEventListener('DOMContentLoaded', function(event) {
  main();
});