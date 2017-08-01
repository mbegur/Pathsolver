
/* global createjs */

document.addEventListener('DOMContentLoaded', () => {
  var stage = new createjs.Stage('pathFinderCanvas');
  var circle = new createjs.Shape();
  circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
  circle.x = 100;
  circle.y = 100;
  stage.addChild(circle);
  stage.update();
});
