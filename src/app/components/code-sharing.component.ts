import {Component, OnInit, Inject} from 'angular2/core';
import {Store} from 'redux';
import {APP_STATE} from '../redux/Constants';
import {CodeSharingActions} from '../redux/CodeSharing';
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
  private unsubscribe: Function;
  private _languages = [
    { value: 'ace/mode/javascript', label: 'javascript' }
  ];
  private editor;

  constructor(
    @Inject(APP_STATE) private store: Store,
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
        this.store.dispatch(this.codeSharingAction.sendCode(this.editor.getValue()));
      }
    });

    this.unsubscribe = this.store.subscribe(() => {
      const {codeSharing} = this.store.getState();
      this.lang = codeSharing.lang;
      this.editor.getSession().setMode(this.lang);
      if(codeSharing.code !== this.editor.getValue()) {
        this.editor.getSession().setValue(codeSharing.code, 1);
      }
    });
  }

  public get languages() {
    return this._languages;
  }
}
