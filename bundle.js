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
  var stage = new createjs.Stage('main-canvas');
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

var _search_export = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./search/search_export\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

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

    this.resetDimensions();
  }

  _createClass(Root, [{
    key: 'addListeners',
    value: function addListeners() {
      var _this = this;

      window.addEventListener('resize', this.resetDimensions.bind(this));

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
      $('#main-canvas').width(window.innerWidth);
      $('#main-canvas').height(window.innerHeight);
    }
  }]);

  return Root;
}();

exports.default = Root;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map