/*
** FrameManager class
** 04-26-2015
*/

function FrameManager() {
  this._lastTime = Date.now();
  this._frameTime = 0;
  this._fixedFrameTime = 0;
  this._time = 0;
}

FrameManager.prototype.tick = function() {
  var now   = Date.now();
  var delta = now - this._lastTime;

  if (delta < this._fixedFrameTime) {
    return false;
  }

  if (delta > this._fixedFrameTime * 2) {
    this._frameTime = this._fixedFrameTime;
  } else {
    this._frameTime = delta;
  }

  this._time += this._frameTime;
  this._lastTime = now;

  return true;
}

FrameManager.prototype.updateSpeed = function(speed) {
  this._fixedFrameTime = speed;
}
