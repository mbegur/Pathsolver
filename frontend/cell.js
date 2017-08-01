/* global createjs */

class Cell {

  constructor(x, y, move) {
    this.cell = new createjs.Shape();
    this.coord = [x, y].join();
    this.cell.x = x;
    this.cell.y = y;
    this.move = move;

  }

  setType(type) {
    this.type = type;
    this.color(Cell.CELLCOLORS[type]);
  }

  toggleObstacle() {

  }
}

Cell.COLORS = {
  'empty': '#f2f2f2',
  'start': '#009933',
  'end': '#cc0000',
  'obstacle': '#a6a6a6',
  'visited': '#98fb98',
  'frontier': '#0ff'
};


export default Cell;
