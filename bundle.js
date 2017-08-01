/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _grid = __webpack_require__(1);

var _grid2 = _interopRequireDefault(_grid);

var _view = __webpack_require__(3);

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global createjs */

document.addEventListener('DOMContentLoaded', function () {
  window.createjs = createjs;

  var stage = new createjs.Stage('pathFinderCanvas');
  var board = new _grid2.default(stage);
  window.board = board;
  board.drawGrid();
  // var stage = new createjs.Stage('pathFinderCanvas');
  // const view = new View(stage);
  // window.view = view;
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* global createjs */

var Board = function () {
  function Board(stage) {
    _classCallCheck(this, Board);

    this.stage = stage;

    this.handleClick = this.handleClick.bind(this);
  }

  _createClass(Board, [{
    key: 'handleClick',
    value: function handleClick(e) {
      var cell = e.target;
      console.log(e.target);
      cell.graphics.beginFill('#0FF').drawRect(0, 0, 10, 10);
      this.stage.update();
    }
  }, {
    key: 'drawGrid',
    value: function drawGrid() {
      for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 15; j++) {
          var cell = new createjs.Shape();
          cell.graphics.setStrokeStyle(0.5).beginStroke("black");
          cell.x = i * 10;
          cell.y = j * 10;
          cell.graphics.beginFill('#FFF').drawRect(0, 0, 10, 10);
          cell.on('click', this.handleClick);

          this.stage.addChild(cell);
        }
      }

      this.stage.update();
    }
  }]);

  return Board;
}();

exports.default = Board;
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

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/mallikbegur/Documents/Pathfinder/frontend/view.js'\n    at Error (native)");

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map