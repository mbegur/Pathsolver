/* global createjs */

class Board {
   constructor(stage) {
     this.stage = stage;

     this.handleClick = this.handleClick.bind(this);
   }

   handleClick(e) {
     const cell = e.target;
     console.log(e.target);
     cell.graphics.beginFill('#0FF').drawRect(0, 0, 10, 10);
     this.stage.update();
   }

   drawGrid() {
     for(let i = 0; i < 15; i ++ ){
       for(let j = 0; j < 15; j ++){
         const cell = new createjs.Shape();
         cell.graphics.setStrokeStyle(0.5).beginStroke("black");
         cell.x = i*10;
         cell.y = j*10;
         cell.graphics.beginFill('#FFF').drawRect(0, 0, 10, 10);
         cell.on('click', this.handleClick);

         this.stage.addChild(cell);
       }
     }

     this.stage.update();
   }
 }

 export default Board;
//
// import Cell from './cell';
//
// class Grid {
//   constructor(stage) {
//
//     this.stage = stage;
//
//     this.resetDimensions();
//     this.grid = this.buildGrid();
//     this.addListeners();
//     this.allowPaint = true;
//   }
//
//   resetDimensions(){
//     this.canvasWidth = this.stage.canvas.width;
//     this.canvasHeight = this.stage.canvas.height;
//     this.width = 20;
//     this.height = 20;
//   }
//
//   buildGrid() {
//     let grid = {};
//
//     for(let i = 0; i < this.canvasWidth; i += this.width){
//       for(let j = 0; j < this.canvasHeight; j += this.height){
//         const node = new Cell(i, j, [this.width, this.height]);
//         grid[node.coords] = node;
//         this.stage.addChild(node.easelCell);
//       }
//     }
//
//     return grid;
//   }
//
//   addListeners() {
//     this.stage.on('click', this.handleClick.bind(this));
//     this.stage.on('pressmove', this.handleMouseMove.bind(this));
//     this.stage.on('pressup', () => {
//       this.handleMouseMove.prevCoords = null;
//     });
//   }
//
//   init() {
//     // this.setupSimple();
//     // this.setStart(`${10*this.width},${10*this.height}`);
//     // this.setGoal(`${26*this.width},${10*this.height}`);
//     createjs.Ticker.addEventListener('tick', this.stage);
//   }
//
//   handleClick(e) {
//     console.log([
//       Math.floor(e.stageX/this.width),
//       Math.floor(e.stageY/this.height),
//     ].toString());
//
//     if (this.allowPaint) {
//       const node = this.grid[this._getCoordsFromEvent(e)];
//       node.toggleIsObstacle();
//     }
//   }
//
//   handleMouseMove(e) {
//     const currCoords = this._getCoordsFromEvent(e);
//     if (!this.grid[currCoords]) return false;
//
//     const prevCoords = this.handleMouseMove.prevCoords;
//
//     //only allow pressmove in discrete cells
//     if(currCoords !== prevCoords) {
//       if (this.start === prevCoords) {
//         this.setStart(currCoords);
//       } else if (this.goal === prevCoords) {
//         this.setGoal(currCoords);
//       } else {
//         if (this.start !== currCoords &&
//             this.goal !== currCoords &&
//             this.allowPaint) {
//           const node = this.grid[currCoords];
//           node.toggleIsObstacle();
//         }
//       }
//
//       this.handleMouseMove.prevCoords = currCoords;
//     }
//   }
//
//   setStart(coords) {
//     if(this.start) this.grid[this.start].setType('empty');
//     this.start = coords;
//
//     this.grid[coords].setType('start');
//   }
//
//   setGoal(coords) {
//     if(this.goal) this.grid[this.goal].setType('empty');
//     this.goal = coords;
//     this.grid[coords].setType('goal');
//   }
//
//   clearSearch() {
//     for(let coords in this.grid){
//       this.grid[coords].clearIfSearch();
//     }
//     this.allowPaint = true;
//   }
//
//   clearObstacles() {
//     for(let coords in this.grid){
//       this.grid[coords].clearIfObstacle();
//     }
//   }
//
//   neighbors(coords) {
//     const [x, y] = coords.split(',').map(str => parseInt(str));
//
//     //array of coords that are neighbors
//     let neighbors = [];
//     for(let width = -1; width < 2; width ++) {
//       for(let height = -1; height < 2; height ++) {
//         if(width === height || width === -height) continue;
//
//         const testCoords = [x + this.width*width, y + this.height*height].toString();
//         if (this.grid[testCoords]) {
//           neighbors.push(testCoords);
//         }
//       }
//     }
//     return neighbors;
//   }
//
//   _localToGrid(localCoords) {
//     let [i, j] = localCoords.split(',').map(str => parseInt(str));
//     return [i*this.width, j*this.height].toString();
//   }
//
//   _getCoordsFromEvent(e) {
//     return [
//       Math.floor(e.stageX/this.width)*this.width,
//       Math.floor(e.stageY/this.height)*this.height,
//     ].toString();
//   }
//
//   _generateCoords() {
//     let x = Math.random()*this.DIM_X;
//     let y = Math.random()*this.DIM_Y;
//     x = Math.floor(x/this.width)*this.width;
//     y = Math.floor(y/this.height)*this.height;
//     return [x, y].toString();
//   }
// }
//
// export default Grid;
