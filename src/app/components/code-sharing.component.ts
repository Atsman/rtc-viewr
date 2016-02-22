import {Component, OnInit} from 'angular2/core';

declare var ace: any;

@Component({
  selector: 'code-sharing',
  styles: [
    `#editor { height: calc(100% - 20px); }`,
    `.code-sharing__language-select {
       width: 100%
     }`
  ],
  template: `
    <pre id="editor">
    </pre>
    <select class="code-sharing__language-select">
        <option *ngFor="#lang of languages"
          value="{{lang.value}}">
          {{lang.label}}
        </option>
    </select>
  `
})
export class CodeSharing implements OnInit {

  private _languages = [
    { value: 'ace/mode/javascript', label: 'javascript' }
  ];
  private editor;

  constructor() {
  }

  public ngOnInit(): void {
    this.editor = ace.edit('editor');
    this.editor.setTheme("ace/theme/twilight");
    this.editor.getSession().setMode('ace/mode/javascript');
    setInterval(() => this.editor.resize(), 500);
    this.editor.on('change', (e) => {
      console.log(this.editor.getValue());
    });
  }

  public get languages() {
    return this._languages;
  }
}
