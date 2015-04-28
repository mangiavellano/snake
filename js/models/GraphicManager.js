/*
** Graphic Manager class
** 04-23-2015
*/

const CANVAS_ID = 'game_canvas';
const START_BTN_ID = 'start_btn';
const SCORE_ID = 'score_value';
const CONTAINER_ID = 'game_container';

function GraphicManager() {
  this._canvas    = document.getElementById(CANVAS_ID);
  this._ctx       = this._canvas.getContext('2d');
  this._width     = this._canvas.width;
  this._height    = this._canvas.height;

  this._startBtn  = document.getElementById(START_BTN_ID);;
  this._scoreElem = document.getElementById(SCORE_ID);;
  this._elemContainer = document.getElementById(CONTAINER_ID);;

  this.createPauseElem();
  this.createGameOverElem();
}

GraphicManager.prototype.createPauseElem = function() {
  this._pauseElem = document.createElement('div');
  this._pauseElem.className = 'pause';
  this._pauseElem.innerHTML = 'Pause';

  this._elemContainer.appendChild(this._pauseElem);
}

GraphicManager.prototype.createGameOverElem = function() {
  this._gameOverElem = document.createElement('div');
  this._gameOverElem.className = 'game-over';
  this._gameOverElem.innerHTML = 'Game Over';

  this._elemContainer.appendChild(this._gameOverElem);
}

GraphicManager.prototype.initCellsSize = function(map) {
  this._cellWidth  = this._width / map._cols;
  this._cellHeight = this._height / map._rows;
}

GraphicManager.prototype.render = function(map, snake) {
  this.clearMap(map);
  this.drawElems('snake', snake._body);
  this.drawElems('food', map._foodElems);
  this.drawElems('poison', map._poisonElems);
}

GraphicManager.prototype.clearMap = function(map) {
  this._ctx.fillStyle = MAP_COLORS.empty;
  this._ctx.fillRect(
    0,
    0,
    map._cols * this._cellWidth,
    map._rows * this._cellHeight
  );
}

GraphicManager.prototype.drawElems = function(elemType, elems) {
  this._ctx.fillStyle = MAP_COLORS[elemType];

  for (var i = 0; i < elems.length; i++) {
    this._ctx.fillRect(
      this._cellWidth * elems[i].x + 1,
      this._cellHeight * elems[i].y + 1,
      this._cellWidth - 2,
      this._cellHeight - 2
    );
  }
}

GraphicManager.prototype.displayScore = function(score) {
  this._scoreElem.innerHTML = score;
}

GraphicManager.prototype.setRestartMode = function(game) {
  this.displayGameOver();
  this._startBtn.innerHTML = 'Restart';
  this._startBtn.onclick = function() { game.restart(); }
}

GraphicManager.prototype.displayPause = function() {
  this._pauseElem.className += ' active';
}

GraphicManager.prototype.removePause = function() {
  this._pauseElem.className = 'pause';
}

GraphicManager.prototype.displayGameOver = function() {
  this._gameOverElem.className += ' active';
}

GraphicManager.prototype.removeGameOver = function() {
  this._gameOverElem.className = ' game-over';
}
