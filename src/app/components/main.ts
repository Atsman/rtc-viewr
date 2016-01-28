import {Component, AfterViewInit} from 'angular2/core';
import {HeaderComponent} from './header.component';
import {MainSectionComponent} from './main-section.component';
import {ToolbarManager} from './toolbarManager';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'main',
  template: `
    <header-component></header-component>
    <main-section></main-section>
  `,
  directives: [HeaderComponent, MainSectionComponent]
})
export class MainComponent implements AfterViewInit {
    private mouseMoveEventBus: Observable<Object>;

    constructor() {
        this.mouseMoveEventBus = Observable
            .fromEvent(window, 'mousemove')
            .debounceTime(100);
    }

    public ngAfterViewInit(): void {
        const toolbar = document.querySelector('.header');
        const controls = document.querySelector('.controls');
        if (toolbar && controls) {
            const toolbarManager = new ToolbarManager(window, toolbar, controls);
            this.mouseMoveEventBus.subscribe(toolbarManager.handleMouseMove.bind(toolbarManager));
        }
    }
};