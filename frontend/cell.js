/* global createjs */

class Cell {
  constructor(x, y) {
    this.singleCell = new createjs.Shape();
    this.drawBorder();
    this.isObstacle = false;
    this.fillByString('empty');

    this.moveTo(x, y);
  }

  setType(type) {
    if (['visited','frontier'].includes(type) &&
        ['start','goal','obstacle'].includes(this.type)) {
          return;
        }

    this.type = type;
    this._fill(Cell.COLORS[type]);
  }

  toggleObstacle() {
    if(this.type === 'obstacle') {
      this.setType('empty');
    } else if (this.type === 'empty') {
      this.setType('obstacle');
    }

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
      .setStrokeStyle(2)
      .beginStroke('#ffffff')
      .drawRect(0,0,10,10);
  }

  moveTo(x, y) {
    this.singleCell.x = x;
    this.singleCell.y = y;
  }

  clearIfSearch() {
    if (['frontier', 'visited'].includes(this.type)) {
      this.setType('empty');
    }
  }

}

Cell.COLORS = {
  'empty': '#DCDCDC',
  'start': '#008000',
  'end': '#FF0000',
  'obstacle': '#808080',
  'visited': '#e0d6f5'
};

export default Cell;
