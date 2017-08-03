/* global createjs */

import Cell from './cell';

class Board {
  constructor(stage) {
    this.stage = stage;
    this.grid = this.drawGrid();
    this.addListeners();
  }


  drawGrid() {
    let grid = {};

    for(let i = 0; i < 300; i += 15){
      for(let j = 0; j < 300; j += 15){
        const node = new Cell(i, j, 15, 15);
        grid[node.coords] = node;
        this.stage.addChild(node.cell);
      }
    }

    return grid;
  }

  addListeners() {
    this.stage.on('click', this.handleClick.bind(this));
    this.stage.on('pressmove', this.handleMouseMove.bind(this));
    this.stage.on('pressup', () => {
      this.handleMouseMove.prevCoords = null;
    });
  }

  init() {
    this.startingMap();
    createjs.Ticker.addEventListener('tick', this.stage);
  }

  handleClick(e) {
    const node = this.grid[this._getCoordsFromEvent(e)];
    node.toggleIsObstacle();
  }

  handleMouseMove(e) {
    const currCoords = this._getCoordsFromEvent(e);
    if (!this.grid[currCoords]) return false;

    const prevCoords = this.handleMouseMove.prevCoords;

    if(currCoords !== prevCoords) {
      if (this.start === prevCoords) {
        this.setStart(currCoords);
      } else if (this.goal === prevCoords) {
        this.setEnd(currCoords);
      } else {
        if (this.start !== currCoords && this.goal !== currCoords) {
          const node = this.grid[currCoords];
          node.toggleIsObstacle();
        }
      }

      this.handleMouseMove.prevCoords = currCoords;
    }
  }

  setStart(coords) {
    if(this.start) this.grid[this.start].setType('empty');
    this.start = coords;

    this.grid[coords].setType('start');
  }

  setEnd(coords) {
    if(this.goal) this.grid[this.goal].setType('empty');
    this.goal = coords;
    this.grid[coords].setType('goal');
  }

  clearSearch() {
    for(let coords in this.grid){
      this.grid[coords].clearIfSearch();
    }
  }

  clearObstacles() {
    for(let coords in this.grid){
      this.grid[coords].clearIfObstacle();
    }
  }

  startingMap() {
    this.clearObstacles();
    this.setStart(`${5*15},${9*15}`);
    this.setEnd(`${14*15},${9*15}`);

  }
  neighbors(coords) {
    const [x, y] = coords.split(',').map(str => parseInt(str));

    let neighbors = [];
    for(let dx = -1; dx < 2; dx ++) {
      for(let dy = -1; dy < 2; dy ++) {
        if(dx === dy || dx === -dy) continue;

        const testCoords = [x + 15*dx, y + 15*dy].toString();
        if (this.grid[testCoords]) {
          neighbors.push(testCoords);
        }
      }
    }

    return neighbors;
  }

  _getCoordsFromEvent(e) {
    return [
      Math.floor(e.stageX/15)*15,
      Math.floor(e.stageY/15)*15,
    ].toString();
  }

  _generateCoords() {
    let x = Math.random()*300;
    let y = Math.random()*300;
    x = Math.floor(x/15)*15;
    y = Math.floor(y/15)*15;
    return [x, y].toString();
  }
}

export default Board;
