/* global createjs */

class Cell {
  constructor(x, y) {
    this.singleCell = new createjs.Shape();
    this.drawBorder();
    this.isObstacle = false;
    this.fillByString('empty')

    this.moveTo(x, y);
  }

  toggleObstacle() {
    this.isObstacle = !this.isObstacle;
    const str =  this.isObstacle? 'obstacle' : 'empty';
    this.fillByString(str);
  }

  _fill(color) {
    this.singleCell.graphics.beginFill(color).drawRect(0,0,10,10);
  }

  fillByString(colorString) {
    this.color = Cell.COLORS[colorString];
    this._fill(Cell.COLORS[colorString]);
  }

  drawBorder() {
    this.singleCell
      .graphics
      .setStrokeStyle(0.5)
      .beginStroke('#ffffff')
      .drawRect(0,0,10,10);
  }

  moveTo(x, y) {
    this.singleCell.x = x;
    this.singleCell.y = y;
  }

}

Cell.COLORS = {
  'empty': '#DCDCDC',
  'start': '#008000',
  'end': '#FF0000',
  'obstacle': '#808080'
};

export default Cell;
