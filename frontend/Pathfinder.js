import Grid from './grid';
import Root from './root';
/* global createjs */

document.addEventListener('DOMContentLoaded', () => {
  window.createjs = createjs;

  const stage = new createjs.Stage('pathFinderCanvas');
  const board = new Grid(stage);
  window.board = board;
  // board.drawGrid();
  // var stage = new createjs.Stage('pathFinderCanvas');
  // const view = new View(stage);
  // window.view = view;
});
