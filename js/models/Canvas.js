/*
** Canvas class
** 04-23-2015
*/

function Canvas(element, container, startBtn, scoreElem) {
  this._element   = element;
  this._ctx       = this._element.getContext('2d');
  this._startBtn  = startBtn;
  this._scoreElem = scoreElem;
  this._elemContainer = container;
  this._width     = this._element.width;
  this._height    = this._element.height;

  this.createPauseElem();
}

Canvas.prototype.createPauseElem = function() {
  this._pauseElem = document.createElement('div');
  this._pauseElem.className = 'pause';
  this._pauseElem.innerHTML = 'Pause';

  this._elemContainer.appendChild(this._pauseElem);
}

Canvas.prototype.initCellsSize = function(map) {
  this._cellWidth  = this._width / map._cols;
  this._cellHeight = this._height / map._rows;
}

Canvas.prototype.render = function(map, snake) {
  this.clearMap(map);
  this.drawElems('snake', snake._body);
  this.drawElems('food', map._foodElems);
  this.drawElems('poison', map._poisonElems);
}

Canvas.prototype.clearMap = function(map) {
  this._ctx.fillStyle = MAP_COLORS.empty;
  this._ctx.fillRect(
    0,
    0,
    map._cols * this._cellWidth,
    map._rows * this._cellHeight
  );
}

Canvas.prototype.drawElems = function(elemType, elems) {
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

Canvas.prototype.displayScore = function(score) {
  this._scoreElem.innerHTML = score;
}

Canvas.prototype.setRestartMode = function(game) {
  this._startBtn.innerHTML = 'Restart';
  this._startBtn.onclick = function() { game.restart(); }
}

Canvas.prototype.displayPause = function() {
  this._pauseElem.className += ' active';
}

Canvas.prototype.removePause = function() {
  this._pauseElem.className = 'pause';
}
