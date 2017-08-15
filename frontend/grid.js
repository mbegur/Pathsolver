/* global createjs */

import Cell from './cell';

class Grid {
  constructor(stage) {
    this.stage = stage;
    this.grid = this.drawGrid();
    this.events();
  }


  drawGrid() {
    let grid = {};

    for(let i = 0; i < 300; i += 15){
      for(let j = 0; j < 300; j += 15){
        const cell = new Cell(i, j);
        grid[cell.coords] = cell;
        this.stage.addChild(cell.cell);
      }
    }
    return grid;
  }

  events() {
    this.stage.on('click', this.handleClick.bind(this));
    this.stage.on('pressmove', this.handleMouseOver.bind(this));
    this.stage.on('pressup', () => {
      this.handleMouseOver.prevCoords = null;
    });
  }



  handleClick(e) {
    const cell = this.grid[this._getCoordsFromEvent(e)];
    cell.toggleIsObstacle();
  }

  handleMouseOver(e) {
    const currCoords = () => {
      return [
        Math.floor(e.stageX/15)*15,
        Math.floor(e.stageY/15)*15,
      ].toString();
    };
    if (!this.grid[currCoords]) return false;

    const prevCoords = this.handleMouseOver.prevCoords;

    if(currCoords !== prevCoords) {
      if (this.start === prevCoords) {
        this.setStart(currCoords);
      } else if (this.goal === prevCoords) {
        this.setEnd(currCoords);
      } else {
        if (this.start !== currCoords && this.goal !== currCoords) {
          const cell = this.grid[currCoords];
          cell.toggleIsObstacle();
        }
      }

      this.handleMouseOver.prevCoords = currCoords;
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

  init() {
    this.startingMap();
    createjs.Ticker.addEventListener('tick', this.stage);
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



}

export default Grid;
