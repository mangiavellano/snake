/*
** Index
** 04-23-2015
*/

function startGame() {
  var canvasElem      = document.getElementById('game_canvas');
  var canvasContainer = document.getElementById('game_container');
  var startBtn        = document.getElementById('start_btn');
  var scoreElem       = document.getElementById('score_value');

  var renderer = new Canvas(canvasElem, canvasContainer, startBtn, scoreElem);
  var game     = new Core(renderer);

  game.start();
}
