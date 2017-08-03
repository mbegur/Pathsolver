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
  // const stage = new createjs.Stage('main-canvas');
  // const root = new Root(stage);
  // window.root = root;
  window.createjs = createjs;

  var stage = new createjs.Stage('pathFinderCanvas');
  var board = new _grid2.default(stage);
  window.board = board;
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

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* global createjs */


var _cell = __webpack_require__(2);

var _cell2 = _interopRequireDefault(_cell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
  function Board(stage) {
    _classCallCheck(this, Board);

    this.stage = stage;

    this.resetDimensions();
    this.grid = this.buildGrid();
    this.addListeners();
  }

  _createClass(Board, [{
    key: 'resetDimensions',
    value: function resetDimensions() {
      this.DIM_X = 300;
      this.DIM_Y = 300;
      this.dx = 10;
      this.dy = 20;
    }
  }, {
    key: 'buildGrid',
    value: function buildGrid() {
      var grid = {};

      for (var i = 0; i < this.DIM_X; i += this.dx) {
        for (var j = 0; j < this.DIM_Y; j += this.dy) {
          var node = new _cell2.default(i, j, this.dx, this.dy);
          grid[node.coords] = node;
          this.stage.addChild(node.cell);
        }
      }

      return grid;
    }
  }, {
    key: 'addListeners',
    value: function addListeners() {
      var _this = this;

      this.stage.on('click', this.handleClick.bind(this));
      this.stage.on('pressmove', this.handleMouseMove.bind(this));
      this.stage.on('pressup', function () {
        _this.handleMouseMove.prevCoords = null;
      });
    }
  }, {
    key: 'init',
    value: function init() {
      this.startingMap();
      createjs.Ticker.addEventListener('tick', this.stage);
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      var node = this.grid[this._getCoordsFromEvent(e)];
      node.toggleIsObstacle();
    }
  }, {
    key: 'handleMouseMove',
    value: function handleMouseMove(e) {
      var currCoords = this._getCoordsFromEvent(e);
      if (!this.grid[currCoords]) return false;

      var prevCoords = this.handleMouseMove.prevCoords;

      //only allow pressmove in discrete cells
      if (currCoords !== prevCoords) {
        if (this.start === prevCoords) {
          this.setStart(currCoords);
        } else if (this.goal === prevCoords) {
          this.setGoal(currCoords);
        } else {
          if (this.start !== currCoords && this.goal !== currCoords) {
            var node = this.grid[currCoords];
            node.toggleIsObstacle();
          }
        }

        this.handleMouseMove.prevCoords = currCoords;
      }
    }
  }, {
    key: 'setStart',
    value: function setStart(coords) {
      if (this.start) this.grid[this.start].setType('empty');
      this.start = coords;

      this.grid[coords].setType('start');
    }
  }, {
    key: 'setGoal',
    value: function setGoal(coords) {
      if (this.goal) this.grid[this.goal].setType('empty');
      this.goal = coords;
      this.grid[coords].setType('goal');
    }
  }, {
    key: 'clearSearch',
    value: function clearSearch() {
      for (var coords in this.grid) {
        this.grid[coords].clearIfSearch();
      }
    }
  }, {
    key: 'clearObstacles',
    value: function clearObstacles() {
      for (var coords in this.grid) {
        this.grid[coords].clearIfObstacle();
      }
    }
  }, {
    key: 'startingMap',
    value: function startingMap() {
      this.clearObstacles();
      console.log(3 * this.dx + ',' + 11 * this.dy);
      this.setStart(3 * this.dx + ',' + 11 * this.dy);
      this.setGoal(10 * this.dx + ',' + 1 * this.dy);
      for (var i = 7; i < 15; i++) {
        this.grid[i * this.dx + ',' + 2 * this.dy].toggleIsObstacle();
      }
      for (var j = 3; j < 10; j++) {
        this.grid[14 * this.dx + ',' + j * this.dy].toggleIsObstacle();
      }
    }
  }, {
    key: 'neighbors',
    value: function neighbors(coords) {
      var _coords$split$map = coords.split(',').map(function (str) {
        return parseInt(str);
      }),
          _coords$split$map2 = _slicedToArray(_coords$split$map, 2),
          x = _coords$split$map2[0],
          y = _coords$split$map2[1];

      //array of coords that are neighbors


      var neighbors = [];
      for (var dx = -1; dx < 2; dx++) {
        for (var dy = -1; dy < 2; dy++) {
          if (dx === dy || dx === -dy) continue;

          var testCoords = [x + this.dx * dx, y + this.dy * dy].toString();
          if (this.grid[testCoords]) {
            neighbors.push(testCoords);
          }
        }
      }

      return neighbors;
    }
  }, {
    key: '_getCoordsFromEvent',
    value: function _getCoordsFromEvent(e) {
      return [Math.floor(e.stageX / this.dx) * this.dx, Math.floor(e.stageY / this.dx) * this.dy].toString();
    }
  }, {
    key: '_generateCoords',
    value: function _generateCoords() {
      var x = Math.random() * this.DIM_X;
      var y = Math.random() * this.DIM_Y;
      x = Math.floor(x / this.dx) * this.dx;
      y = Math.floor(y / this.dy) * this.dy;
      return [x, y].toString();
    }
  }]);

  return Board;
}();

Board.dx = 12;
Board.dy = 12;
Board.DIM_X = 290; //pixels, not # gridpoints
Board.DIM_Y = 145;

exports.default = Board;

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

var graphNode = function () {
  function graphNode(x, y, dx, dy) {
    _classCallCheck(this, graphNode);

    this.easelCell = new createjs.Shape();
    this.dx = dx;
    this.dy = dy;
    this.setType('empty');
    this.setCoords(x, y);
  }

  _createClass(graphNode, [{
    key: 'setType',
    value: function setType(type) {
      if (['visited', 'frontier'].includes(type) && ['start', 'goal', 'obstacle'].includes(this.type)) {
        return;
      }

      this.type = type;
      this._fill(graphNode.COLORS[type]);
    }
  }, {
    key: 'setCoords',
    value: function setCoords(x, y) {
      this.coords = [x, y].toString();
      this.easelCell.x = x;
      this.easelCell.y = y;
    }
  }, {
    key: 'toggleIsObstacle',
    value: function toggleIsObstacle() {
      if (this.type === 'obstacle') {
        this.setType('empty');
      } else if (this.type === 'empty') {
        this.setType('obstacle');
      }
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
    key: '_fill',
    value: function _fill(color) {
      this.easelCell.graphics.clear();
      this.drawBorder();
      this.easelCell.graphics.beginFill(color).drawRect(1, 1, this.dx - 2, this.dy - 2).endFill();
    }
  }, {
    key: 'drawBorder',
    value: function drawBorder() {
      this.easelCell.graphics.setStrokeStyle(1).beginStroke('#fff').drawRect(0, 0, this.dx, this.dy).endStroke();
    }
  }]);

  return graphNode;
}();

graphNode.COLORS = {
  'empty': '#DCDCDC',
  'start': '#008000',
  'end': '#FF0000',
  'obstacle': '#808080',
  'visited': '#e0d6f5'
};

exports.default = graphNode;

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
    this.finder = new _a_star2.default(this.board);
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
        _this.finder.kill();
        _this.finder = new _a_star2.default(_this.board);
        _this.board.clearSearch();
      });
      $('#run-search').on('click', function (e) {
        e.preventDefault();
        _this.finder.run();
      });
      $('#clear-search').on('click', function (e) {
        e.preventDefault();
        _this.finder.kill();
        _this.board.clearSearch();
      });
      $('#set-obs').on('click', function (e) {
        e.preventDefault();
        var preset = $('input[name=preset]:checked', '#obs-controls').val();
        _this.finder.kill();
        _this.board.clearSearch();
        if (preset === 'simple') {
          _this.board.setupSimple();
        } else if (preset === 'maze') {
          _this.board.setupMaze();
        }
      });
      $('#clear-obs').on('click', function (e) {
        e.preventDefault();
        _this.board.clearObstacles();
      });
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