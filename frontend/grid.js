/* global createjs */

import Cell from './cell';

class Grid {
  constructor(stage) {
    this.stage = stage;
    createjs.Ticker.addEventListener('tick', this.stage);
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.grid = this.drawGrid();

  }

  drawGrid() {
    let grid = [];

    for(let i = 0; i < 15; i++ ) {
      grid.push([]);
      for (let j = 0; j < 15; j++) {
        const newCell = new Cell(i*10, j*10);
        this.stage.addChild(newCell.singleCell);
        grid[i].push(newCell);
      }
    }

   this.setStart(grid[10][11]);
   this.setEnd(grid[1][7]);

   this.stage.on('click', this.handleClick);
   this.stage.on('pressmove', this.handleMouseOver);
   this.stage.on('pressup', () => {
     this.handleMouseOver.prevX = null;
     this.handleMouseOver.prevY = null;
   });

   return grid;
 }


  handleClick(e) {
    const gridX = Math.floor(e.stageX/10);
    const gridY = Math.floor(e.stageY/10);
    const cell = this.grid[gridX][gridY];
    if (this.start === cell || this.end === cell) {
      return false;
    }

    cell.toggleObstacle();
    return true;
  }

  handleMouseOver(e) {
    const currX = Math.floor(e.stageX/10) * 10;
    const currY = Math.floor(e.stageY/10) * 10;
    const prevX = this.handleMouseOver.prevX;
    const prevY = this.handleMouseOver.prevY;

    if (currX !== prevX || currY !== prevY) {
      const cell = this.grid[currX/10][currY/10];

      if (this.isStart(prevX, prevY)) {
        this.setStart(cell);
      }else if(this.isEnd(prevX, prevY)) {
        this.setEnd(cell);
      }else {
        cell.toggleObstacle();
      }
      this.handleMouseOver.prevX = currX;
      this.handleMouseOver.prevY = currY;
    }
  }

  isStart(x, y) {
    return x === this.start.singleCell.x && y === this.start.singleCell.y;
  }

  isEnd(x, y) {
    return x === this.end.singleCell.x && this.end.singleCell.y;
  }

  setStart(node) {
    if(this.start) {
      this.start.fillByString('empty');
    }

    node.fillByString('start');
    this.start = node;
  }

  setEnd(node) {
    if (this.end) {
      this.end.fillByString('empty');
    }
    node.fillByString('end');
    this.end = node;
  }


}

export default Grid;
