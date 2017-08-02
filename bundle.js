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
    createjs.Ticker.addEventListener('tick', this.stage);
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

      this.setStart(grid[10][11]);
      this.setEnd(grid[1][7]);

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
    key: 'toggleObstacle',
    value: function toggleObstacle() {
      this.isObstacle = !this.isObstacle;
      var str = this.isObstacle ? 'obstacle' : 'empty';
      this.fillByString(str);
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
      this.singleCell.graphics.setStrokeStyle(1.5).beginStroke('#ffffff').drawRect(0, 0, 10, 10);
    }
  }, {
    key: 'moveTo',
    value: function moveTo(x, y) {
      this.singleCell.x = x;
      this.singleCell.y = y;
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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map