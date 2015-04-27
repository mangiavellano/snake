/*
** Map class javascript file
** 04-23-2015
*/

const MAP_COLORS = {
  empty: '#eee',
  snake: '#333',
  food: 'blue',
  poison: 'red'
}

const MAP_ELEMS = {
  empty: 0,
  snake: 1,
  food: 2,
  poison: 3
}

const FOOD_SCORE = 5;
const POISON_SCORE = -5;

function Map() {
  this._cols = MAP_COLS;
  this._rows = MAP_ROWS;
  this._foodElems   = [];
  this._poisonElems = [];
}

Map.prototype.dropElem = function(type, snakeBody) {
  var elem = {
    x: Math.round(Math.random() * this._cols),
    y: Math.round(Math.random() * this._rows)
  };

  // Check if the food element isn't outside of the map (because of Math.round)
  if (elem.x === this._cols) { elem.x -= 1; }
  if (elem.y === this._rows) { elem.y -= 1; }

  // Check if the food element doesn't pop on the same cell than snake
  for (var i = 0; i < snakeBody.length; i++) {
    if (JSON.stringify(elem) === JSON.stringify(snakeBody[i])) {
      this.dropElem(MAP_ELEMS.food, snakeBody);
      return;
    }
  }

  if (type === MAP_ELEMS.food) {
    this._foodElems.push(elem);
  }
  else if (type === MAP_ELEMS.poison) {
    this._poisonElems.push(elem);
  }
}

Map.prototype.removeElem = function(type, element) {
  var elemList;

  if (type === MAP_ELEMS.food) {
    elemList = this._foodElems;
  }
  else if (type === MAP_ELEMS.poison) {
    elemList = this._poisonElems;
  }

  for (var i = 0; i < elemList.length ; i++) {
    if (JSON.stringify(element) === JSON.stringify(elemList[i])) {
      elemList.splice(i, 1);
      break;
    }
  }
}
