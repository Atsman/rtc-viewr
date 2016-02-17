import {Component, OnInit} from 'angular2/core';

declare var ace: any;

@Component({
  selector: 'code-sharing',
  styles: [
    '#editor {height: 100%}'
  ],
  template: `
    <pre id="editor">
    </pre>
  `
})
export class CodeSharing implements OnInit {
  constructor() {
  }

  public ngOnInit(): void {
    const editor = ace.edit('editor');
    editor.session.setMode('ace/mode/javascript');
    setInterval(() => editor.resize(), 500);
  }
}
