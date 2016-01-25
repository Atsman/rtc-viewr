import {Component} from 'angular2/core';

@Component({
  selector: 'header-component',
  template: `
    <header class="header">
      <div class="header-inner">
        <div class="header-title">
          <h1>Interviewr Conference</h1>
        </div>
        <div class="header-actions">
          <nav class="header-nav">
            <a href="#" class="header-nav__item">
              <i class="fa fa-paper-plane"></i>
            </a>
            <a href="#" class="header-nav__item chat-btn">
              <i class="fa fa-comments"></i>
            </a>
            <a href="#" class="header-nav__item">
              <i class="fa fa-code"></i>
            </a>
            <a href="#" class="header-nav__item">
              <i class="fa fa-cogs"></i>
            </a>
          </nav>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {

}