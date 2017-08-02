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

var _root = __webpack_require__(3);

var _root2 = _interopRequireDefault(_root);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global createjs */

document.addEventListener('DOMContentLoaded', function () {
  window.createjs = createjs;

  var stage = new createjs.Stage('pathFinderCanvas');
  var board = new _grid2.default(stage);
  window.board = board;
  // board.drawGrid();
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* global createjs */

var _cell = __webpack_require__(2);

var _cell2 = _interopRequireDefault(_cell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Grid = function () {
  function Grid(stage) {
    _classCallCheck(this, Grid);

    this.stage = stage;
    // createjs.Ticker.addEventListener('tick', this.stage);
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.grid = this.drawGrid();
  }

  _createClass(Grid, [{
    key: 'drawGrid',
    value: function drawGrid() {
      var _this = this;

      var grid = [];

      for (var i = 0; i < 15; i++) {
        grid.push([]);
        for (var j = 0; j < 15; j++) {
          var newCell = new _cell2.default(i * 10, j * 10);
          this.stage.addChild(newCell.singleCell);
          grid[i].push(newCell);
        }
      }

      this.setStart(grid[4][7]);
      this.setEnd(grid[10][7]);

      this.stage.on('click', this.handleClick);
      this.stage.on('pressmove', this.handleMouseOver);
      this.stage.on('pressup', function () {
        _this.handleMouseOver.prevX = null;
        _this.handleMouseOver.prevY = null;
      });

      return grid;
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      var gridX = Math.floor(e.stageX / 10);
      var gridY = Math.floor(e.stageY / 10);
      var cell = this.grid[gridX][gridY];
      if (this.start === cell || this.end === cell) {
        return false;
      }

      cell.toggleObstacle();
      return true;
    }
  }, {
    key: 'handleMouseOver',
    value: function handleMouseOver(e) {
      var currX = Math.floor(e.stageX / 10) * 10;
      var currY = Math.floor(e.stageY / 10) * 10;
      var prevX = this.handleMouseOver.prevX;
      var prevY = this.handleMouseOver.prevY;

      if (currX !== prevX || currY !== prevY) {
        var cell = this.grid[currX / 10][currY / 10];

        if (this.isStart(prevX, prevY)) {
          this.setStart(cell);
        } else if (this.isEnd(prevX, prevY)) {
          this.setEnd(cell);
        } else {
          cell.toggleObstacle();
        }
        this.handleMouseOver.prevX = currX;
        this.handleMouseOver.prevY = currY;
      }
    }
  }, {
    key: 'isStart',
    value: function isStart(x, y) {
      return x === this.start.singleCell.x && y === this.start.singleCell.y;
    }
  }, {
    key: 'isEnd',
    value: function isEnd(x, y) {
      return x === this.end.singleCell.x && this.end.singleCell.y;
    }
  }, {
    key: 'clearIfSearch',
    value: function clearIfSearch() {
      if (['frontier', 'visited'].includes(this.type)) {
        this.setType('empty');
      }
    }
  }, {
    key: 'clearIfObstacle',
    value: function clearIfObstacle() {
      if (this.type === 'obstacle') this.setType('empty');
    }
  }, {
    key: 'setStart',
    value: function setStart(node) {
      if (this.start) {
        this.start.fillByString('empty');
      }

      node.fillByString('start');
      this.start = node;
    }
  }, {
    key: 'setEnd',
    value: function setEnd(node) {
      if (this.end) {
        this.end.fillByString('empty');
      }
      node.fillByString('end');
      this.end = node;
    }
  }]);

  return Grid;
}();

exports.default = Grid;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* global createjs */

var Cell = function () {
  function Cell(x, y) {
    _classCallCheck(this, Cell);

    this.singleCell = new createjs.Shape();
    this.drawBorder();
    this.isObstacle = false;
    this.fillByString('empty');

    this.moveTo(x, y);
  }

  _createClass(Cell, [{
    key: 'setType',
    value: function setType(type) {
      if (['visited', 'frontier'].includes(type) && ['start', 'goal', 'obstacle'].includes(this.type)) {
        return;
      }

      this.type = type;
      this._fill(Cell.COLORS[type]);
    }
  }, {
    key: 'toggleObstacle',
    value: function toggleObstacle() {
      if (this.type === 'obstacle') {
        this.setType('empty');
      } else if (this.type === 'empty') {
        this.setType('obstacle');
      }
    }
  }, {
    key: '_fill',
    value: function _fill(color) {
      this.singleCell.graphics.beginFill(color).drawRect(0, 0, 10, 10);
    }
  }, {
    key: 'fillByString',
    value: function fillByString(colorString) {
      this.color = Cell.COLORS[colorString];
      this._fill(Cell.COLORS[colorString]);
    }
  }, {
    key: 'drawBorder',
    value: function drawBorder() {
      this.singleCell.graphics.setStrokeStyle(2).beginStroke('#ffffff').drawRect(0, 0, 10, 10);
    }
  }, {
    key: 'moveTo',
    value: function moveTo(x, y) {
      this.singleCell.x = x;
      this.singleCell.y = y;
    }
  }, {
    key: 'clearIfSearch',
    value: function clearIfSearch() {
      if (['frontier', 'visited'].includes(this.type)) {
        this.setType('empty');
      }
    }
  }]);

  return Cell;
}();

Cell.COLORS = {
  'empty': '#DCDCDC',
  'start': '#008000',
  'end': '#FF0000',
  'obstacle': '#808080',
  'visited': '#e0d6f5'
};

exports.default = Cell;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _grid = __webpack_require__(1);

var _grid2 = _interopRequireDefault(_grid);

var _a_star = __webpack_require__(4);

var _a_star2 = _interopRequireDefault(_a_star);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.aStar = _a_star2.default;

var View = function () {
  function View(stage) {
    _classCallCheck(this, View);

    this.board = new _grid2.default(stage);
    this.board.init();
    this.aStar = new _a_star2.default(this.board);
    this.addListeners();

    this.resetDimensions();
  }

  _createClass(View, [{
    key: 'addListeners',
    value: function addListeners() {
      var _this = this;

      window.addEventListener('resize', this.resetDimensions.bind(this));

      $('#algo-controls input').on('change', function () {
        var algoName = $('input[name=algo]:checked', '#algo-controls').val();
        _this.aStar.kill();
        _this.board.clearSearch();
      });
      $('#start-search').on('click', function (e) {
        e.preventDefault();
        _this.finder.run();
      });
      // $('#clear-search').on('click', (e) => {
      //   e.preventDefault();
      //   this.finder.kill();
      //   this.board.clearSearch();
      // });
      // $('#set-obs').on('click', (e) => {
      //   e.preventDefault();
      //   const preset = $('input[name=preset]:checked', '#obs-controls').val();
      //   this.finder.kill();
      //   this.board.clearSearch();
      //   if(preset === 'simple') {
      //     this.board.setupSimple();
      //   } else if (preset === 'maze') {
      //     this.board.setupMaze();
      //   }
      // });
      // $('#clear-obs').on('click', (e) => {
      //   e.preventDefault();
      //   this.board.clearObstacles();
      // });
    }
  }, {
    key: 'resetDimensions',
    value: function resetDimensions() {
      $('#main-canvas').width(window.innerWidth);
      $('#main-canvas').height(window.innerHeight);
      this.board.resetDimensions();
    }
  }]);

  return View;
}();

exports.default = View;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _priority_queue = __webpack_require__(5);

var _priority_queue2 = _interopRequireDefault(_priority_queue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var aStar = function () {
  function aStar(grid) {
    _classCallCheck(this, aStar);

    this.board = grid;
  }

  _createClass(aStar, [{
    key: 'addFrontier',
    value: function addFrontier() {
      this.frontier = new _priority_queue2.default();
      this.reset();
      this.processNeighbors(this.board.start);
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.cameFrom = {};
      this.cameFrom[this.board.start] = null;
      this.costSoFar = {};
      this.costSoFar[this.board.start] = 0;
    }
  }, {
    key: 'restart',
    value: function restart() {
      clearInterval(this.updateInterval);
      this.reset();
    }
  }, {
    key: 'heuristic',
    value: function heuristic(a, b) {
      var _a$split$map = a.split(',').map(function (int) {
        return parseInt(int);
      }),
          _a$split$map2 = _slicedToArray(_a$split$map, 2),
          x1 = _a$split$map2[0],
          y1 = _a$split$map2[1];

      var _b$split$map = b.split(',').map(function (int) {
        return parseInt(int);
      }),
          _b$split$map2 = _slicedToArray(_b$split$map, 2),
          x2 = _b$split$map2[0],
          y2 = _b$split$map2[1];

      var dx = Math.abs(x2 - x1);
      var dy = Math.abs(y2 - y1);
      return dx + dy;
    }
  }, {
    key: 'processNeighbors',
    value: function processNeighbors(current) {
      this.board.neighbors(current).forEach(function (neighbor) {
        var type = this.board.grid[neighbor].type;
        var cost = type === 'obstacle' ? 99999 : 1;
        var newCost = this.costSoFar[current] + cost;

        if (!(neighbor in this.costSoFar) || newCost < this.costSoFar[neighbor]) {
          var priority = newCost + this.heuristic(neighbor, this.board.end);

          this.frontier.insert(neighbor, priority);
          this.cameFrom[neighbor] = current;
          this.costSoFar[neighbor] = newCost;
          this.board.grid[neighbor].setType('frontier');
        }
      }.bind(this));
    }
  }, {
    key: 'oldRun',
    value: function oldRun() {
      this.addFrontier();

      while (!this.frontier.isEmpty()) {
        var current = this.frontier.dequeue();
        if (current === this.board.end) break;

        this.processNeighbors(current);
        this.board.grid[current].setType('visited');
      }

      return this.buildPath();
    }
  }, {
    key: 'run',
    value: function run() {
      var _this = this;

      this.addFrontier();

      this.updateInterval = setInterval(function () {
        var current = _this.frontier.dequeue();
        if (!current || current === _this.board.end) {
          clearInterval(_this.updateInterval);
          // this.path = new Path(this.buildPath(), this.board.stage)
        }

        _this.processNeighbors(current);
        _this.board.grid[current].setType('visited');
      }, 20);
    }
  }, {
    key: 'buildPath',
    value: function buildPath() {
      if (!this.cameFrom[this.board.end]) {
        return null;
      }

      var current = this.board.end;
      var path = [];

      while (current) {
        path.unshift(current);
        current = this.cameFrom[current];
      }

      return path;
    }
  }]);

  return aStar;
}();

exports.default = aStar;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// When inserting a new element to heap, heap is repaired by bubbling-up
// when deleting a new element to heap, heap is repaired by bubbling-down

var PriorityQueue = function () {
  function PriorityQueue() {
    _classCallCheck(this, PriorityQueue);

    this.elements = [{ value: null, priority: 0 }];
  }

  _createClass(PriorityQueue, [{
    key: "empty",
    value: function empty() {
      return this.elements === 0;
    }
  }, {
    key: "put",
    value: function put(value, priority) {
      this.elements.push({ value: value, priority: priority });
      this._bubbleUp();
      return this.elements.length;
    }
  }, {
    key: "remove",
    value: function remove() {
      if (this.empty()) {
        return null;
      } else if (this.elements.length === 2) {
        return this.elements.pop().value;
      } else {
        var min = this.elements[1];
        this.elements[1] = this.elements.pop();
        this._bubbleDown();
        return min;
      }
    }
  }, {
    key: "_bubbleUp",
    value: function _bubbleUp() {
      var child = this.elements.length - 1;
      var parent = Math.floor(child / 2);
      while (this.elements[child].priority < this.elements[parent].priority) {
        var _ref = [this.elements[parent], this.elements[child]];
        this.elements[child] = _ref[0];
        this.elements[parent] = _ref[1];


        child = parent;
        parent = Math.floor(child / 2);
      }
    }
  }, {
    key: "_bubbleDown",
    value: function _bubbleDown() {
      var idx = 1;
      var minChildIdx = this._getMinChildIdx(idx);

      while (minChildIdx && this.elements[idx].priority > this.elements[minChildIdx].priority) {
        var _ref2 = [this.elements[minChildIdx], this.elements[idx]];
        this.elements[idx] = _ref2[0];
        this.elements[minChildIdx] = _ref2[1];


        idx = minChildIdx;
        minChildIdx = this._getMinChildIdx(idx);
      }
    }
  }, {
    key: "_getMinChildIdx",
    value: function _getMinChildIdx(idx) {
      var left = this.elements[2 * idx];
      var right = this.elements[2 * idx + 1];
      var minChildIdx = void 0,
          minPriority = void 0;
      if (right) {
        minPriority = Math.min(left.priority, right.priority);
      } else if (left) {
        minPriority = left.priority;
      } else {
        return false;
      }
      return left.priority === minPriority ? 2 * idx : 2 * idx + 1;
    }
  }]);

  return PriorityQueue;
}();

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map