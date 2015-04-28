/*
** InputManager class
** 04-25-2015
*/

const KEYBOARD_CONST = 37;

const KEY_CODES = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  escape: 27,
  return: 13
};

function InputManager(game) {
  this._keydown = null;
  this._game    = game;

  this.bindInputListeners();
}

InputManager.prototype.bindInputListeners = function() {
  var self = this;

  window.addEventListener('keydown', function(event) {
    self.bindKeyDown(event);
  }, false);
}

InputManager.prototype.bindKeyDown = function(event) {
  this._keydown = event.which;
  this.forceUpdateGame();
}

InputManager.prototype.unbindKeyDown = function() {
  this._keydown = null;
}

InputManager.prototype.forceUpdateGame = function() {
  if (!this._game._snake) { return; }

  if (this._keydown === KEY_CODES.escape) {
    this._game.switchMode();
    this._keydown = null;
  }
}

InputManager.prototype.reset = function() {
  this._keydown = null;
}
