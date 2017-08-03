import Root from './root';
/* global createjs */

document.addEventListener('DOMContentLoaded', ()=> {
  const stage = new createjs.Stage('main-canvas');
  const root = new Root(stage);
  window.root = root;
});
