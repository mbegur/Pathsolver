/* global createjs */

class Cell {

  constructor(x, y, move) {
    this.cell = new createjs.Shape();
    this.coord = [x, y].join();
    this.cell.x = x;
    this.cell.y = y;
    this.move = move;

  }

  setFill(fill) {
    this.fill = fill;
    this.color(Cell.CELLCOLORS[fill]);
  }

  toggleObstacle() {
    if (this.fill === 'obstacle') {
      this.setFill('empty');
    } else if (this.fill === 'empty') {
      this.setFill('obstacle');
    }
  }

  drawBorder() {
    this.cell.graphics.setStrokeStyle(1).beginStroke('#ffffff')
    .drawRect(0, 0, this.move[0], this.move[1]).endStroke();
  }

  color(code) {
    this.cell.graphics.clear();
    this.drawBorder();
    this.cell.graphics.beginFill(code).drawRect(1, 1, this.move[0] - 1, this.move[1] - 1).endFill();

  }

  clearIfSearch() {
    if (['frontier', 'visited'].includes(this.type)) {
      this.setType('empty');
    }
  }

  clearIfObstacle() {
    if (this.type === 'obstacle') this.setType('empty');
  }
}

Cell.CELLCOLORS = {
  'empty': '#f2f2f2',
  'start': '#009933',
  'end': '#cc0000',
  'obstacle': '#a6a6a6',
  'visited': '#ffb3ff',
  'frontier': '#e6ffe6'
};


export default Cell;
