/* global createjs */
class Cell {
  constructor(x, y) {
    this.cell = new createjs.Shape();
    this.drawBorder();
    this.isObstacle = false;
    this.fillByString('empty');
  }

  fillColor(color) {
    this.cell.graphics.beginFill(color).drawRect(0, 0, 10, 10);
  }

  fillByString(str) {
    this.color = Cell.COLORS[str];
    this.fillColor(Cell.COLORS[str]);
  }

  toggleObstacle() {
    this.isObstacle = !this.isObstacle;
    const str = this.isObstacle? 'obstacle' : 'empty';
    this.fillByString(str);
  }

  drawBorder() {
    this.cell.graphics.setStrokeStyle(1).beginStroke('#fff').drawRect(0, 0, 10, 10);
  }

  moveTo(x, y) {
    this.cell.x = x;
    this.cell.y = y;
  }

}

Cell.COLORS = {
  'empty': '#f2f2f2',
  'start': '#009933',
  'end': '#0000ff',
  'obstacle': '#a6a6a6'
};

export default Cell;
