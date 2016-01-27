import {Component, AfterViewInit} from 'angular2/core';
import {HeaderComponent} from './components/header.component';
import {MainSectionComponent} from './components/main-section.component';
import {ToolbarManager} from './components/toolbarManager';
import {Observable} from 'rxjs/Rx';
import {stateAndDispatcher} from './state/state';

@Component({
  selector: 'my-app',
  template: `
    <header-component></header-component>
    <main-section></main-section>
  `,
  directives: [HeaderComponent, MainSectionComponent],
  providers: stateAndDispatcher
})
export class AppComponent implements AfterViewInit {
  private mouseMoveEventBus: Observable<Object>;

  constructor() {
     this.mouseMoveEventBus = Observable
      .fromEvent(window, 'mousemove')
      .debounceTime(100);
  }

  public ngAfterViewInit(): void {
    const toolbar = document.querySelector('.header');
    const controls = document.querySelector('.controls');
    if(toolbar && controls) {
      const toolbarManager = new ToolbarManager(window, toolbar, controls);
      this.mouseMoveEventBus.subscribe(toolbarManager.handleMouseMove.bind(toolbarManager));
    }
  }
};