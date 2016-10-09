(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _first = require('./modules/first');

var _first2 = _interopRequireDefault(_first);

var _transition = require('./modules/transition');

var _transition2 = _interopRequireDefault(_transition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transTest = new _transition2.default();
transTest.initialize();

},{"./modules/first":2,"./modules/transition":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var test = function test() {
  console.log('The test has begun');
};

exports.default = test;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var transition = function () {
    function transition() {
        _classCallCheck(this, transition);

        this.header = document.querySelector('.header-wrapper');
        this.portfolio = document.querySelector('.portfolio-wrapper');
        this.navLinkPortfolio = document.querySelectorAll('.portfolio-link');
    }

    _createClass(transition, [{
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

    return transition;
}();

exports.default = transition;

},{}]},{},[1]);
