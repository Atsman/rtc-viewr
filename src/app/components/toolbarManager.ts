/** Idle time in ms before the UI is hidden. */
var HIDE_TIMEOUT = 2000;
/** Velocity required in a mousemove to reveal the UI (pixels/sample). */
var SHOW_VELOCITY = 25;
/** Distance from the top of the screen required to reveal the toolbars. */
var TOP_TOOLBAR_REVEAL_DISTANCE = 100;
/** Distance from the top of the screen required to reveal the toolbars. */
var BOTTOM_CONTROLS_REVEAL_DISTANCE = 150;

function isHighVelocityMouseMove(e) {
  // TODO: event.movementX/movementY are not working.
  return e.type == 'mousemove';
  /*return e.type == 'mousemove' && e.originalEvent.movementX * e.originalEvent.movementX + e.originalEvent.movementY * e.originalEvent.movementY > SHOW_VELOCITY * SHOW_VELOCITY;*/
}

function isMouseNearTopToolbar(e) {
  return e.pageY < TOP_TOOLBAR_REVEAL_DISTANCE;
}

function isMouseNearControls(e) {
  return e.pageY > window.innerHeight - BOTTOM_CONTROLS_REVEAL_DISTANCE;
}

export function ToolbarManager(window, toolbar, controls) {
  this.window_ = window;
  this.toolbar_ = toolbar;
  this.controls_ = controls;

  this.toolbarTimeout_ = null;
  this.isMouseNearTopToolbar_ = false;
  this.isMouseNearControls_ = false;
}

ToolbarManager.prototype = {

  handleMouseMove: function(e) {
    this.isMouseNearTopToolbar_ = this.toolbar_ && isMouseNearTopToolbar(e);
    this.isMouseNearControls_ = this.controls_ && isMouseNearControls(e);

    if(this.isMouseNearTopToolbar_ || isHighVelocityMouseMove(e) || this.isMouseNearControls_) {
      this.showToolbars();
    }
    this.hideToolbarsAfterTimeout();
  },

  showToolbars: function() {
    if(this.toolbar_) {
      /*this.toolbar_.show();*/
      this.toolbar_.classList.add('active');
      this.controls_.classList.add('active');
    }
  },

  hideToolbarsForMouseOut: function() {
    this.isMouseNearTopToolbar_ = false;
    this.isMouseNearControls_ = false;
    this.hideToolbarsAfterTimeout();
  },

  hideToolbarsIfAllowed: function() {
    if(this.isMouseNearTopToolbar_ || this.isMouseNearControls_) {
      return;
    }

    if((this.toolbar_ && document.activeElement == this.toolbar_) || document.activeElement == this.controls_) {
      const actieElement: HTMLElement = <HTMLElement>document.activeElement;
      actieElement.blur();
    }

    if(this.toolbar_) {
      /*this.toolbar_.hide();*/
      this.toolbar_.classList.remove('active');
      this.controls_.classList.remove('active');
    }
  },

  hideToolbarsAfterTimeout: function() {
    if(this.toolbarTimeout_) {
      this.window_.clearTimeout(this.toolbarTimeout_);
    }
    this.toolbarTimeout_ = this.window_.setTimeout(this.hideToolbarsIfAllowed.bind(this), HIDE_TIMEOUT);
  }

};