import {Component, OnInit, Inject} from 'angular2/core';
import {CodeSharingActions} from '../redux/CodeSharing';
import {AppStore} from '../redux/AppStore';

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
  private lang: string;
  private _languages = [
    { value: 'ace/mode/javascript', label: 'javascript' }
  ];
  private editor;

  constructor(
    private store: AppStore,
    private codeSharingAction: CodeSharingActions
  ) {
  }

  public ngOnInit(): void {
    this.editor = ace.edit('editor');
    this.editor.setTheme('ace/theme/twilight');
    this.editor.getSession().setMode('ace/mode/javascript');
    setInterval(() => this.editor.resize(), 500);
    this.editor.on('change', (e) => {
      if (this.editor.curOp && this.editor.curOp.command.name) {
        const appState = this.store.getCurrentState();
        const cursor = this.editor.selection.getCursor();
        console.log(cursor);
        const codeSharingMessage = {
          code: this.editor.getValue(),
          roomId: appState.interview.roomId,
          lang: appState.codeSharing.lang,
          cursor: {
            column: <number> cursor.column,
            row: <number> cursor.row
          }
        };
        this.store.dispatch(this.codeSharingAction.sendCode(codeSharingMessage));
      }
    });

    this.store.getCodeSharingState().subscribe((codeSharing) => {
      this.lang = codeSharing.lang;
      this.editor.getSession().setMode(this.lang);
      if(codeSharing.code !== this.editor.getValue()) {
        this.editor.getSession().setValue(codeSharing.code, 1);
        this.editor.gotoLine(codeSharing.cursor.row, codeSharing.cursor.column);
      }
    });
  }

  public get languages() {
    return this._languages;
  }
}
