/* global createjs */

class Cell {
  constructor(x, y) {
    this.cell = new createjs.Shape();

    this.setType('empty');
    this.setCoords(x, y);
  }

  setType(type) {
    if (['visited','frontier'].includes(type) &&
    ['start','goal','obstacle'].includes(this.type)) {
          return;
        }

    this.type = type;
    this._fill(Cell.COLORS[type]);
  }

  setCoords(x, y) {
    this.coords = [x, y].toString();
    this.cell.x = x;
    this.cell.y = y;
  }

  toggleIsObstacle() {
    if(this.type === 'obstacle') {
      this.setType('empty');
    } else if (this.type === 'empty') {
      this.setType('obstacle');
    }
  }

  clearIfSearch() {
    if (['frontier', 'visited'].includes(this.type)) {
      this.setType('empty');
    }
  }

  clearIfObstacle() {
    if (this.type === 'obstacle') this.setType('empty');
  }

  _fill(color) {
    this.cell.graphics.clear();
    this.drawBorder();
    this.cell
      .graphics
      .beginFill(color)
      .drawRect(0,0,15, 15)
      .endFill();
  }

  drawBorder() {
    this.cell
      .graphics
      .setStrokeStyle(1)
      .beginStroke('white')
      .drawRect(0,0, 15, 15)
      .endStroke();
  }
}

Cell.COLORS = {
  'empty': '#DCDCDC',
  'start': '#008000',
  'goal': '#FF0000',
  'obstacle': '#808080',
  'visited': '#c2adeb',
  'frontier': '#a184e1'
};

export default Cell;
