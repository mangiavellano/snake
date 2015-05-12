/*
** index.js
** A snake game
** Anthony Mangiavellano - 04-23-2015
*/

function startGame(options) {
  var game = new Core();

  game.setOptions(options);
  game.start();
}
