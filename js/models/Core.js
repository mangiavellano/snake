/*
** Core class
** 04-23-2015
*/

const MAP_ROWS = 20;
const MAP_COLS = 40;
const SNAKE_INITIAL_SIZE = 4;
const SNAKE_INITIAL_DIRECTION = DIRECTIONS.right;

// Change the value of GAME_SPEED if models/FrameManager.js
const GAME_SPEEDS = {
  easy: 10,
  normal: 15,
  hard: 20
}

const POISON_FREQUENCES = {
  easy: 10,
  normal: 7,
  hard: 5
}

function Core(renderer) {
  this._renderer     = renderer;
  this._map          = new Map();
  this._snake        = new Snake();
  this._inputManager = new InputManager(this);
  this._frameManager = new FrameManager();
  this._activeLoop   = false;
  this._score        = 0;

  this._renderer.initCellsSize(this._map);
  this._map.dropElem(MAP_ELEMS.food, this._snake._body);
}

Core.prototype.checkTouchedElem = function() {
  if (this._snake._touchedFood) {
    const dropPoison  = Math.round(Math.random() * POISON_FREQUENCES.normal);

    this.updateScore(FOOD_SCORE);
    if (dropPoison === POISON_FREQUENCES.normal) {
      this._map.dropElem(MAP_ELEMS.poison, this._snake._body);
    }
  } else if (this._snake._touchedPoison) {
    this.updateScore(POISON_SCORE);
  }

  this._snake.resetTouchedElem();
}

Core.prototype.update = function() {
  this._snake.updateDirection(this._inputManager._keydown);
  this._snake.move();
  this._snake.checkCollisions(this._map);
  this.checkTouchedElem();

  if (!this._snake._alive) {
    this.gameOver();
    return false;
  }

  return true;
}

Core.prototype.render = function() {
  this._renderer.render(this._map, this._snake);
}

Core.prototype.loop = function() {
  var self  = this;
  const currentTimestamp = this._frameManager.currentTimestamp();

  this._frameManager.incrementDt(currentTimestamp);

  while (this._frameManager._dt > this._frameManager._step) {
    this._frameManager.decrementDt();
    // Update game logic if loop is active
    if (this._activeLoop) { this.update(); }
  }

  // Render game if loop is active
  if (this._activeLoop) { this.render(); }

  // TODO: create method, private properties shouldn't be modified outside of the class
  this._frameManager._last = currentTimestamp;

  window.requestAnimationFrame(function() { self.loop() });
}

Core.prototype.pause = function() {
  this._activeLoop = false;
}

Core.prototype.switchMode = function() {
  this._activeLoop ? this.pause() : this.start();
}

Core.prototype.start = function() {
  var self = this;
  this._activeLoop = true;
  this.updateScore(0);

  window.requestAnimationFrame(function() { self.loop(); });
}

Core.prototype.restart = function() {
  this._map   = new Map();
  this._snake = new Snake();
  this._score = 0;
  this._map.dropElem(MAP_ELEMS.food, this._snake._body);
  this.start();
}

Core.prototype.gameOver = function() {
  var self = this;

  this.pause();
  this._map = null;
  this._snake = null;
  this._inputManager.reset();

  // TODO: create method, private properties shouldn't be modified outside of the class
  this._renderer._startBtn.innerHTML = 'Restart';
  this._renderer._startBtn.onclick = function() { self.restart(); }
}

Core.prototype.updateScore = function(score) {
  this._score += score;
  this._renderer.displayScore(this._score);
}
