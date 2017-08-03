import Grid from './grid';
import Root from './root';
/* global createjs */

document.addEventListener('DOMContentLoaded', () => {
  // const stage = new createjs.Stage('main-canvas');
  // const root = new Root(stage);
  // window.root = root;
  window.createjs = createjs;

  const stage = new createjs.Stage('pathFinderCanvas');
  const board = new Grid(stage);
  window.board = board;
  // var stage = new createjs.Stage('pathFinderCanvas');
  // const view = new View(stage);
  // window.view = view;
});
