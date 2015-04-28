/*
** Index
** 04-23-2015
*/

function startGame() {
  var game = new Core();
  var foundRaF = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || 
    window.msRequestAnimationFrame

  window.requestAnimationFrame = requestAnimationFrame;

  game.start();
}
