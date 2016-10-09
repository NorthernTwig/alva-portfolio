(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _first = require('./modules/first');

var _first2 = _interopRequireDefault(_first);

var _Transition = require('./modules/Transition');

var _Transition2 = _interopRequireDefault(_Transition);

var _GenerateSquare = require('./modules/GenerateSquare');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transTest = new _Transition2.default();
transTest.initialize();
var init = new _GenerateSquare.Initializer(5, 2000, 'http://localhost:5000/images');

},{"./modules/GenerateSquare":2,"./modules/Transition":3,"./modules/first":4}],2:[function(require,module,exports){
'use strict';

// Github: https://github.com/NorthernTwig/forever-scroll

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GenerateSquare = function () {
    function GenerateSquare() {
        _classCallCheck(this, GenerateSquare);

        this.container = document.querySelector('.image-container');
    }

    _createClass(GenerateSquare, [{
        key: 'appendRowToContainer',
        value: function appendRowToContainer(row) {
            this.container.appendChild(row);
        }
    }, {
        key: 'appendSquareToRow',
        value: function appendSquareToRow(row, square) {
            row.appendChild(square);
        }
    }, {
        key: 'create',
        value: function create(element) {
            return document.createElement(element);
        }
    }, {
        key: 'generateSquare',
        value: function generateSquare() {
            var square = this.create('div');
            square.classList.add('square');
            return square;
        }
    }, {
        key: 'generateRow',
        value: function generateRow() {
            var row = this.create('div');
            row.classList.add('row');
            return row;
        }
    }, {
        key: 'generateAll',
        value: function generateAll(rows, squares) {
            for (var i = 0; i < rows; i++) {
                var row = this.generateRow();
                for (var j = 0; j < squares; j++) {
                    var square = this.generateSquare();
                    this.appendSquareToRow(row, square);
                }
                this.appendRowToContainer(row);
            }
        }
    }]);

    return GenerateSquare;
}();

var ScrollChecker = function () {
    function ScrollChecker(link) {
        _classCallCheck(this, ScrollChecker);

        this.container = document.querySelector('.image-container');
        this.gS = new GenerateSquare();
        this.iC = new ImageCollection(link);
        this.rowAmount = 1;
        this.squareAmount = 3;
        this.pre = 3;
        this.imageAmountLimit = 25;
    }

    _createClass(ScrollChecker, [{
        key: 'initialize',
        value: function initialize(squaresPerRow, imageAmountLimit) {
            this.squareAmount = squaresPerRow;
            this.imageAmountLimit = imageAmountLimit;

            this.initializeListener();
            for (var i = 0; i < this.pre; i++) {
                this.generateMoreSquares();
            }
        }
    }, {
        key: 'initializeListener',
        value: function initializeListener() {
            this.container.addEventListener('scroll', this.generateMoreSquares.bind(this));
        }
    }, {
        key: 'countSquares',
        value: function countSquares() {
            var count = 0;
            for (var i = 0; i < this.container.children.length; i++) {
                count += this.container.children[i].children.length;
            }
            return count;
        }
    }, {
        key: 'generateMoreSquares',
        value: function generateMoreSquares() {
            if (this.countSquares() < this.setImageLimit()) {
                if (this.setImageLimit() - this.countSquares() > this.squareAmount) {
                    if (this.getPositionBottomSquare() < this.getBottomPosition()) {
                        this.gS.generateAll(this.rowAmount, this.squareAmount);
                    }
                } else {
                    this.squareAmount = this.setImageLimit() - this.countSquares();
                    this.gS.generateAll(this.rowAmount, this.squareAmount);
                }
            }
            this.iC.initialize(this.countSquares());
        }
    }, {
        key: 'getPositionBottomSquare',
        value: function getPositionBottomSquare() {
            var squares = document.querySelectorAll('.square');
            if (this.countSquares() > 0) {
                return squares[squares.length - 1].offsetTop + squares[squares.length - 1].clientHeight - 200;
            } else {
                return 0;
            }
        }
    }, {
        key: 'getBottomPosition',
        value: function getBottomPosition() {
            return this.container.scrollTop + screen.height;
        }
    }, {
        key: 'setImageLimit',
        value: function setImageLimit() {
            return this.imageAmountLimit;
        }
    }]);

    return ScrollChecker;
}();

var ImageCollection = function () {
    function ImageCollection(link) {
        _classCallCheck(this, ImageCollection);

        this.link = link;
        this.currentAmountOfImages = 0;
    }

    _createClass(ImageCollection, [{
        key: 'initialize',
        value: function initialize(imageAddAmount) {
            for (var sIx = this.currentAmountOfImages; sIx < imageAddAmount; sIx++) {
                this.getImages(sIx);
            }
            this.currentAmountOfImages = imageAddAmount;
        }
    }, {
        key: 'getImages',
        value: function getImages(squareIndex) {
            var squareImage = document.querySelectorAll('.square')[squareIndex];

            fetch(this.link).then(function (response) {
                return response.clone();
            }).then(function (cloned) {
                return cloned.json();
            }).then(function (imageJson) {
                squareImage.style.backgroundImage = 'url(' + imageJson[squareIndex] + ')';
                squareImage.classList.add('display');
            }).catch(function () {
                return console.log(response.text);
            });
        }
    }]);

    return ImageCollection;
}();

var Initializer = function Initializer(squaresPerRow, imageAmountLimit, link) {
    _classCallCheck(this, Initializer);

    var sC = new ScrollChecker(link);
    sC.initialize(squaresPerRow, imageAmountLimit);
};

exports.GenerateSquare = GenerateSquare;
exports.Initializer = Initializer;
exports.ImageCollection = ImageCollection;
exports.ScrollChecker = ScrollChecker;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Transition = function () {
    function Transition() {
        _classCallCheck(this, Transition);

        this.header = document.querySelector('.header-wrapper');
        this.portfolio = document.querySelector('.portfolio-wrapper');
        this.navLinkPortfolio = document.querySelectorAll('.portfolio-link');
    }

    _createClass(Transition, [{
        key: 'initialize',
        value: function initialize() {
            this.navLinkPortfolio[0].addEventListener('click', this.move.bind(this));
            this.navLinkPortfolio[1].addEventListener('click', this.move.bind(this));
        }
    }, {
        key: 'move',
        value: function move() {
            this.header.classList.toggle('slide-left');
            this.portfolio.classList.toggle('negative-slide-left');
        }
    }]);

    return Transition;
}();

exports.default = Transition;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var test = function test() {
  console.log('The test has begun');
};

exports.default = test;

},{}]},{},[1]);
