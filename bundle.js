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


var _root = __webpack_require__(3);

var _root2 = _interopRequireDefault(_root);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global createjs */

document.addEventListener('DOMContentLoaded', function () {
  var stage = new createjs.Stage('pathFinderCanvas');
  var root = new _root2.default(stage);
  window.root = root;
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
    this.grid = this.drawGrid();
    this.addListeners();
  }

  _createClass(Board, [{
    key: 'drawGrid',
    value: function drawGrid() {
      var grid = {};

      for (var i = 0; i < 300; i += 15) {
        for (var j = 0; j < 300; j += 15) {
          var node = new _cell2.default(i, j, 15, 15);
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

      if (currCoords !== prevCoords) {
        if (this.start === prevCoords) {
          this.setStart(currCoords);
        } else if (this.goal === prevCoords) {
          this.setEnd(currCoords);
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
    key: 'setEnd',
    value: function setEnd(coords) {
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
      this.setStart(5 * 15 + ',' + 9 * 15);
      this.setEnd(14 * 15 + ',' + 9 * 15);
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

      var neighbors = [];
      for (var dx = -1; dx < 2; dx++) {
        for (var dy = -1; dy < 2; dy++) {
          if (dx === dy || dx === -dy) continue;

          var testCoords = [x + 15 * dx, y + 15 * dy].toString();
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
      return [Math.floor(e.stageX / 15) * 15, Math.floor(e.stageY / 15) * 15].toString();
    }
  }, {
    key: '_generateCoords',
    value: function _generateCoords() {
      var x = Math.random() * 300;
      var y = Math.random() * 300;
      x = Math.floor(x / 15) * 15;
      y = Math.floor(y / 15) * 15;
      return [x, y].toString();
    }
  }]);

  return Board;
}();

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

var Cell = function () {
  function Cell(x, y, dx, dy) {
    _classCallCheck(this, Cell);

    this.cell = new createjs.Shape();
    this.dx = dx;
    this.dy = dy;
    this.setType('empty');
    this.setCoords(x, y);
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
    key: 'setCoords',
    value: function setCoords(x, y) {
      this.coords = [x, y].toString();
      this.cell.x = x;
      this.cell.y = y;
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
      this.cell.graphics.clear();
      this.drawBorder();
      this.cell.graphics.beginFill(color).drawRect(0, 0, this.dx, this.dy).endFill();
    }
  }, {
    key: 'drawBorder',
    value: function drawBorder() {
      this.cell.graphics.setStrokeStyle(1).beginStroke('white').drawRect(0, 0, this.dx, this.dy).endStroke();
    }
  }]);

  return Cell;
}();

Cell.COLORS = {
  'empty': '#DCDCDC',
  'start': '#008000',
  'goal': '#FF0000',
  'obstacle': '#808080',
  'visited': '#c2adeb',
  'frontier': '#a184e1'
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

var _search_export = __webpack_require__(7);

var Finders = _interopRequireWildcard(_search_export);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.Finders = Finders;

var Root = function () {
  function Root(stage) {
    _classCallCheck(this, Root);

    this.board = new _grid2.default(stage);
    this.board.init();
    this.finder = new Finders.AStar(this.board);
    this.addListeners();
    window.addEventListener('resize', this.resetDimensions.bind(this));

    this.resetDimensions();
  }

  _createClass(Root, [{
    key: 'addListeners',
    value: function addListeners() {
      var _this = this;

      $('#algorithims input').on('change', function () {
        var algoName = $('input[name=algorithim-type]:checked', '#algorithims').val();
        _this.finder.kill();
        _this.finder = new Finders[algoName](_this.board);
        _this.board.clearSearch();
      });
      $('#start-search').on('click', function (e) {
        e.preventDefault();
        _this.finder.run();
      });
      $('#clear-search').on('click', function (e) {
        e.preventDefault();
        _this.finder.kill();
        _this.board.clearSearch();
      });
    }
  }, {
    key: 'resetDimensions',
    value: function resetDimensions() {
      console.log(window.innerWidth);
      console.log(window.innerHeight);
      $('#pathFinderCanvas').width(window.innerWidth);
      $('#pathFinderCanvas').height(window.innerHeight);
    }
  }]);

  return Root;
}();

exports.default = Root;

/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PriorityQueue = function () {
  function PriorityQueue() {
    _classCallCheck(this, PriorityQueue);

    this.elements = [{ item: null, priority: 0 }];
  }

  _createClass(PriorityQueue, [{
    key: "put",
    value: function put(item, priority) {
      this.elements.push({ item: item, priority: priority });
      this._bubbleUp();

      return this.elements.length;
    }
  }, {
    key: "get",
    value: function get() {
      if (this.isEmpty()) {
        return null;
      } else if (this.elements.length === 2) {
        return this.elements.pop();
      } else {
        var min = this.elements[1];
        this.elements[1] = this.elements.pop();
        this._bubbleDown();

        return min.item;
      }
    }
  }, {
    key: "_bubbleUp",
    value: function _bubbleUp() {
      var childIdx = this.elements.length - 1;
      var parentIdx = Math.floor(childIdx / 2);
      while (this.elements[childIdx].priority < this.elements[parentIdx].priority) {
        var _ref = [this.elements[parentIdx], this.elements[childIdx]];
        this.elements[childIdx] = _ref[0];
        this.elements[parentIdx] = _ref[1];


        childIdx = parentIdx;
        parentIdx = Math.floor(childIdx / 2);
      }
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return this.elements.length === 1;
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
      var leftChild = this.elements[2 * idx];
      var rightChild = this.elements[2 * idx + 1];
      var minChildIdx = void 0,
          minPriority = void 0;
      if (rightChild) {
        minPriority = Math.min(leftChild.priority, rightChild.priority);
      } else if (leftChild) {
        minPriority = leftChild.priority;
      } else {
        return false;
      }
      return leftChild.priority === minPriority ? 2 * idx : 2 * idx + 1;
    }
  }]);

  return PriorityQueue;
}();

exports.default = PriorityQueue;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _line = __webpack_require__(9);

var _line2 = _interopRequireDefault(_line);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Search = function () {
  function Search(board) {
    _classCallCheck(this, Search);

    this.board = board;
    this.reset();
  }

  _createClass(Search, [{
    key: 'reset',
    value: function reset() {
      if (this.path) this.path.reset();
      this.cameFrom = {};
      this.cameFrom[this.board.start] = null;
    }
  }, {
    key: 'kill',
    value: function kill() {
      clearInterval(this.updateInterval);
      this.reset();
    }
  }, {
    key: 'run',
    value: function run() {
      var _this = this;

      this.initializeFrontier();

      this.updateInterval = setInterval(function () {
        var current = _this.frontier.get();
        if (!current || current === _this.board.goal) {
          clearInterval(_this.updateInterval);
          _this.path = new _line2.default(_this.buildPath(), _this.board.stage);
        }

        _this.processNeighbors(current);
        _this.board.grid[current].setType('visited');
      }, 100);
    }
  }, {
    key: 'oldRun',
    value: function oldRun() {
      this.initializeFrontier();

      while (!this.frontier.isEmpty()) {
        var current = this.frontier.get();
        if (current === this.board.goal) break;

        this.processNeighbors(current);
        this.board.grid[current].setType('visited');
      }

      return this.buildPath();
    }
  }, {
    key: 'buildPath',
    value: function buildPath() {
      if (!this.cameFrom[this.board.goal]) {
        return null;
      }

      var current = this.board.goal;
      var path = [];

      while (current) {
        path.unshift(current);
        current = this.cameFrom[current];
      }

      return path;
    }
  }, {
    key: 'heuristic',
    value: function heuristic(coords1, coords2) {
      var _coords1$split$map = coords1.split(',').map(function (s) {
        return parseInt(s);
      }),
          _coords1$split$map2 = _slicedToArray(_coords1$split$map, 2),
          x1 = _coords1$split$map2[0],
          y1 = _coords1$split$map2[1];

      var _coords2$split$map = coords2.split(',').map(function (s) {
        return parseInt(s);
      }),
          _coords2$split$map2 = _slicedToArray(_coords2$split$map, 2),
          x2 = _coords2$split$map2[0],
          y2 = _coords2$split$map2[1];

      return Math.abs(x1 - x2) + Math.abs(y1 - y2);
    }
  }]);

  return Search;
}();

exports.default = Search;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AStar = exports.Dijkstra = exports.BFS = undefined;

var _bfs = __webpack_require__(8);

var _bfs2 = _interopRequireDefault(_bfs);

var _dijkstra = __webpack_require__(11);

var _dijkstra2 = _interopRequireDefault(_dijkstra);

var _a_star = __webpack_require__(12);

var _a_star2 = _interopRequireDefault(_a_star);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.BFS = _bfs2.default;
exports.Dijkstra = _dijkstra2.default;
exports.AStar = _a_star2.default;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _search = __webpack_require__(6);

var _search2 = _interopRequireDefault(_search);

var _queue = __webpack_require__(10);

var _queue2 = _interopRequireDefault(_queue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BFS = function (_Search) {
  _inherits(BFS, _Search);

  function BFS() {
    _classCallCheck(this, BFS);

    return _possibleConstructorReturn(this, (BFS.__proto__ || Object.getPrototypeOf(BFS)).apply(this, arguments));
  }

  _createClass(BFS, [{
    key: 'initializeFrontier',
    value: function initializeFrontier() {
      this.frontier = new _queue2.default();

      this.processNeighbors(this.board.start);
    }
  }, {
    key: 'processNeighbors',
    value: function processNeighbors(current) {
      this.board.neighbors(current).forEach(function (neighbor) {
        if (!(neighbor in this.cameFrom)) {
          var type = this.board.grid[neighbor].type;
          if (type !== 'obstacle') {
            this.frontier.enqueue(neighbor);
            this.cameFrom[neighbor] = current;
            this.board.grid[neighbor].setType('frontier');
          }
        }
      }.bind(this));
    }
  }]);

  return BFS;
}(_search2.default);

exports.default = BFS;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* global createjs */

var Path = function () {
  function Path(path, stage) {
    _classCallCheck(this, Path);

    this.stage = stage;
    this.processStringPath(path);
  }

  _createClass(Path, [{
    key: 'processStringPath',
    value: function processStringPath(stringPath) {
      this.path = new createjs.Shape();
      this.path.graphics.setStrokeStyle(1).beginStroke('#00FFFF');

      stringPath.forEach(function (strCoords) {
        var _strCoords$split$map = strCoords.split(',').map(function (s) {
          return parseInt(s);
        }),
            _strCoords$split$map2 = _slicedToArray(_strCoords$split$map, 2),
            x = _strCoords$split$map2[0],
            y = _strCoords$split$map2[1];

        x += 7.5;y += 7.5;
        this.path.graphics.lineTo(x, y);
      }.bind(this));
      this.path.graphics.endStroke();
      this.stage.addChild(this.path);
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.stage.removeChild(this.path);
    }
  }]);

  return Path;
}();

exports.default = Path;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Queue = function Queue() {
  var _this = this;

  _classCallCheck(this, Queue);

  this.elements = [];
  this.get = function () {
    return _this.elements.pop();
  };
  this.enqueue = function (item) {
    return _this.elements.unshift(item);
  };
  this.isEmpty = function () {
    return _this.elements.length === 0;
  };
};

exports.default = Queue;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _search = __webpack_require__(6);

var _search2 = _interopRequireDefault(_search);

var _priority_queue = __webpack_require__(5);

var _priority_queue2 = _interopRequireDefault(_priority_queue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dijkstra = function (_Search) {
  _inherits(Dijkstra, _Search);

  function Dijkstra() {
    _classCallCheck(this, Dijkstra);

    return _possibleConstructorReturn(this, (Dijkstra.__proto__ || Object.getPrototypeOf(Dijkstra)).apply(this, arguments));
  }

  _createClass(Dijkstra, [{
    key: 'initializeFrontier',
    value: function initializeFrontier() {
      this.frontier = new _priority_queue2.default();
      this.processNeighbors(this.board.start);
    }
  }, {
    key: 'reset',
    value: function reset() {
      _get(Dijkstra.prototype.__proto__ || Object.getPrototypeOf(Dijkstra.prototype), 'reset', this).call(this);
      this.costSoFar = {};
      this.costSoFar[this.board.start] = 0;
    }
  }, {
    key: 'processNeighbors',
    value: function processNeighbors(current) {
      this.board.neighbors(current).forEach(function (neighbor) {
        var type = this.board.grid[neighbor].type;
        var cost = type === 'obstacle' ? 100 : 1;
        var newCost = this.costSoFar[current] + cost;

        if (!(neighbor in this.costSoFar) || newCost < this.costSoFar[neighbor]) {
          this.frontier.put(neighbor, newCost);
          this.cameFrom[neighbor] = current;
          this.costSoFar[neighbor] = newCost;
          this.board.grid[neighbor].setType('frontier');
        }
      }.bind(this));
    }
  }]);

  return Dijkstra;
}(_search2.default);

exports.default = Dijkstra;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _search = __webpack_require__(6);

var _search2 = _interopRequireDefault(_search);

var _priority_queue = __webpack_require__(5);

var _priority_queue2 = _interopRequireDefault(_priority_queue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AStar = function (_Search) {
  _inherits(AStar, _Search);

  function AStar() {
    _classCallCheck(this, AStar);

    return _possibleConstructorReturn(this, (AStar.__proto__ || Object.getPrototypeOf(AStar)).apply(this, arguments));
  }

  _createClass(AStar, [{
    key: 'initializeFrontier',
    value: function initializeFrontier() {
      this.frontier = new _priority_queue2.default();
      this.processNeighbors(this.board.start);
    }
  }, {
    key: 'reset',
    value: function reset() {
      _get(AStar.prototype.__proto__ || Object.getPrototypeOf(AStar.prototype), 'reset', this).call(this);
      this.costSoFar = {};
      this.costSoFar[this.board.start] = 0;
    }
  }, {
    key: 'processNeighbors',
    value: function processNeighbors(current) {
      this.board.neighbors(current).forEach(function (neighbor) {
        var type = this.board.grid[neighbor].type;
        var cost = type === 'obstacle' ? 99999 : 1;
        var newCost = this.costSoFar[current] + cost;

        if (!(neighbor in this.costSoFar) || newCost < this.costSoFar[neighbor]) {
          var priority = newCost + this.heuristic(neighbor, this.board.goal);

          this.frontier.put(neighbor, priority);
          this.cameFrom[neighbor] = current;
          this.costSoFar[neighbor] = newCost;
          this.board.grid[neighbor].setType('frontier');
        }
      }.bind(this));
    }
  }]);

  return AStar;
}(_search2.default);

exports.default = AStar;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map