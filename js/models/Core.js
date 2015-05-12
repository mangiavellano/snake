/*
** Core.js
** A snake game
** Anthony Mangiavellano - 04-23-2015
*/

const SNAKE_INITIAL_SIZE = 4;
const SNAKE_INITIAL_DIRECTION = DIRECTIONS.right;

function Core() {
  this._renderer     = new GraphicManager();
  this._map          = new Map();
  this._snake        = new Snake();
  this._inputManager = new InputManager(this);
  this._frameManager = new FrameManager();
  this._settings     = new Settings();
  this._boundGameRun = null;
  this._activeLoop   = false;
  this._score        = 0;

  this.init();
}

Core.prototype.init = function() {
  this._renderer.initCellsSize(this._map);
  this._map.dropElem(MAP_ELEMS.food, this._snake._body);
}

Core.prototype.setOptions = function(options) {
  this._settings.update(options);
  this._frameManager.updateSpeed(this._settings.speed);
}

Core.prototype.checkTouchedElem = function() {
  if (this._snake._touchedFood) {
    this.updateScore(FOOD_SCORE);

    const dropPoison = Math.round(Math.random() * this._settings.poisonFrequence);
    if (dropPoison === this._settings.poisonFrequence && this._settings.poisonFrequence) {
      this._map.dropElem(MAP_ELEMS.poison, this._snake._body);
    }
  } else if (this._snake._touchedPoison) {
    this.updateScore(POISON_SCORE);
  }

  this._snake.resetTouchedElem();
}

Core.prototype.update = function() {
  this._snake.updateDirection(this._inputManager._keydown);
  this._snake.move(this._map, this._settings.crossMap);
  this._snake.checkCollisions(this._map, this._settings.crossMap);
  this.checkTouchedElem();

  if (!this._snake._alive) { this.gameOver(); }
}

Core.prototype.draw = function() {
  this._renderer.render(this._map, this._snake);
}

Core.prototype.run = function() {
  this.update();
  if (this._activeLoop) {
    this.draw();
  }
}

Core.prototype.gameRun = function() {
  var self = this;

  if (this._frameManager.tick() && this._activeLoop) {
    this.run();
  }

  requestAnimationFrame(this.gameRun.bind(self));
}

Core.prototype.pause = function() {
  this._activeLoop = false;
  this._renderer.displayPause();
}

Core.prototype.switchMode = function() {
  this._activeLoop ? this.pause() : this.start();
}

Core.prototype.start = function() {
  this._activeLoop = true;
  this.updateScore(0);
  this._renderer.removePause();
  this.gameRun();
}

Core.prototype.restart = function() {
  this._map   = new Map();
  this._snake = new Snake();
  this._score = 0;
  this._map.dropElem(MAP_ELEMS.food, this._snake._body);
  this._renderer.removeGameOver();
  this._inputManager.reset();
  this.start();
}

Core.prototype.gameOver = function() {
  var self = this;

  this._activeLoop = false;
  this._map = null;
  this._snake = null;
  this._renderer.setRestartMode(self);
}

Core.prototype.updateScore = function(score) {
  this._score += score;
  this._renderer.displayScore(this._score);
}
