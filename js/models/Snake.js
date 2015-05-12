/*
** Snake class javascript file
** 04-23-2015
*/

var DIRECTIONS = {
  left: 0,
  up: 1,
  right: 2,
  down: 3
};

function Snake() {
  this._body          = [];
  this._direction     = SNAKE_INITIAL_DIRECTION;
  this._alive         = true;
  this._touchedElem   = null;
  this._touchedFood   = false;
  this._touchedPoison = false;

  this.initialize();
}

Snake.prototype.initialize = function() {
  var x = Math.round(MAP_COLS / 2) - 1;
  var y = Math.round(MAP_ROWS / 2) - 1;

  for (var i = 0; i < SNAKE_INITIAL_SIZE; i++) {
    this._body.push({x: x, y: y});

    switch (this._direction) {
      case DIRECTIONS.up:
        y += 1;
        break;
      case DIRECTIONS.right:
        x -= 1;
        break;
      case DIRECTIONS.down:
        y -= 1;
        break;
      case DIRECTIONS.left:
        x += 1;
        break;
    }
  }
}

Snake.prototype.getHead = function() {
  return this._body[0];
}

Snake.prototype.getTail = function() {
  return this._body[this._body.length - 1];
}

Snake.prototype.updateDirection = function(keycode) {
  if (!keycode) { return; }
  const direction = keycode - KEYBOARD_CONST;

  if (direction < DIRECTIONS.left || direction > DIRECTIONS.down) { return; }

  if (
      (direction % 2 == 0 && this._direction % 2 != 0) ||
      (direction % 2 != 0 && this._direction % 2 == 0)
     ) {
    this._direction = direction;
  }
}

Snake.prototype.move = function(map, crossMap) {
  var x = this.getHead().x;
  var y = this.getHead().y;

  switch (this._direction) {
    case DIRECTIONS.up:
      y -= 1;
      break;
    case DIRECTIONS.right:
      x += 1;
      break;
    case DIRECTIONS.down:
      y += 1;
      break;
    case DIRECTIONS.left:
      x -= 1;
      break;
  }

  if (crossMap > 0) {
    if (x >= map._cols) { x = 0; }
    else if (x < 0) { x = map._cols - 1; }
    else if (y >= map._rows) { y = 0; }
    else if (y < 0) { y = map._rows - 1; }
  }

  this._body.pop();
  this._body.unshift({x: x, y: y});
}

Snake.prototype.grow = function() {
  var newBodyPart = this.getHead();

  this._body.unshift(newBodyPart);
}

Snake.prototype.shrink = function() {
  this._body.shift();
}

Snake.prototype.isOutOfMap = function(map) {
  if (
      this.getHead().x >= map._cols || this.getHead().x < 0 ||
      this.getHead().y >= map._rows || this.getHead().y < 0
     ) {
    return true;
  }

  return false;
}

Snake.prototype.touchesHimself = function() {
  // Starts at second element of the body
  for (var i = 1; i < this._body.length ; i++) {
    if (JSON.stringify(this.getHead()) === JSON.stringify(this._body[i])) {
      return true;
    }
  }

  return false;
}

Snake.prototype.isOnElem = function(map) {
  for (var i = 0; i < map._foodElems.length; i++) {
    if (JSON.stringify(this.getHead()) === JSON.stringify(map._foodElems[i])) {
      this._touchedElem = {x: map._foodElems[i].x, y: map._foodElems[i].y};
      this._touchedFood = true;
      return MAP_ELEMS.food;
    }
  }

  for (var i = 0; i < map._poisonElems.length; i++) {
    if (JSON.stringify(this.getHead()) === JSON.stringify(map._poisonElems[i])) {
      this._touchedElem = {x: map._poisonElems[i].x, y: map._poisonElems[i].y};
      this._touchedPoison = true;
      return MAP_ELEMS.poison;
    }
  }

  return false;
}

Snake.prototype.checkCollisions = function(map, crossMap) {
  const elemType = this.isOnElem(map);

  // Snake is out of map of touches himself
  if ((this.isOutOfMap(map) && crossMap == 0) || this.touchesHimself()) {
    this._alive = false;
  }

  // Snake is on a food element
  if (elemType && elemType === MAP_ELEMS.food) {
    this.grow();
    map.removeElem(MAP_ELEMS.food, this._touchedElem);
    map.dropElem(MAP_ELEMS.food, this._body);
  }

  // Snake is on a poison element
  if (elemType && elemType === MAP_ELEMS.poison) {
    this.shrink();
    map.removeElem(MAP_ELEMS.poison, this._touchedElem);
  }
}

Snake.prototype.resetTouchedElem = function() {
  this._touchedElem = null;
  this._touchedFood = false;
  this._touchedPoison = false;
}
