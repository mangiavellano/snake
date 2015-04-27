/*
** FrameManager class
** 04-26-2015
*/

function FrameManager(renderer) {
  this._step = 1 / GAME_SPEEDS.hard;
  this._dt   = 0;
  this._last = this.currentTimestamp();
}

FrameManager.prototype.currentTimestamp = function() {
  var currentTime;

  if (window.performance && window.performance.now) {
    currentTime = window.performance.now();
  } else {
    currentTime = Date.now();
  }

  return currentTime;
}

FrameManager.prototype.incrementDt = function(currentTimestamp) {
  this._dt += Math.min(1, (currentTimestamp - this._last) / 1000);
}

FrameManager.prototype.decrementDt = function() {
  this._dt -= this._step;
}
