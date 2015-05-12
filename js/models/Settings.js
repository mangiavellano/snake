/*
** Settings class javascript file
** 05-07-2015
*/

const GAME_SPEEDS = {
  easy: 80,
  normal: 50,
  hard: 30
};

const POISON_FREQUENCES = {
  easy: 10,
  normal: 7,
  hard: 5,
  none: 0
};

function Settings() {
  this.speed = GAME_SPEEDS.normal;
  this.crossMap = 1;
  this.poisonFrequence = POISON_FREQUENCES.none;
}

Settings.prototype.update = function(options) {
  if (options.speed !== undefined) { this.speed = parseInt(options.speed); }
  if (options.crossMap !== undefined) { this.crossMap = parseInt(options.crossMap); }
  if (options.poisonFrequence !== undefined) { this.poisonFrequence = parseInt(options.poisonFrequence); }  
}
