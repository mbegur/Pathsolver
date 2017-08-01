/* global createjs */
class Cell {
  constructor(x, y) {
    this.easelCell = new createjs.Shape();
    this.drawBorder();
    this.isObstacle = false;
    this.fillByString('empty');

    this.moveTo(x, y);
  }

  toggleIsObstacle() {
    this.isObstacle = !this.isObstacle;
    const str =  this.isObstacle? 'obstacle' : 'empty';
    this.fillByString(str);
  }

  _fill(color) {
    this.easelCell.graphics.beginFill(color).drawRect(0,0,10,10);
  }

  fillByString(colorString) {
    this.color = Cell.COLORS[colorString];
    this._fill(Cell.COLORS[colorString]);
  }

  drawBorder() {
    this.easelCell
      .graphics
      .setStrokeStyle(0.5)
      .beginStroke('#ffffff')
      .drawRect(0,0,10,10);
  }

  moveTo(x, y) {
    this.easelCell.x = x;
    this.easelCell.y = y;
  }
}

Cell.COLORS = {
  'empty': '#f2f2f2',
  'start': '#009933',
  'end': '#0000ff',
  'obstacle': '#a6a6a6'
};

export default Cell;
