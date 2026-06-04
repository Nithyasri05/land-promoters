"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ApiFeatures =
/*#__PURE__*/
function () {
  function ApiFeatures(quary, quarystr) {
    _classCallCheck(this, ApiFeatures);

    this.quary = quary;
    this.quarystr = quarystr;
  }

  _createClass(ApiFeatures, [{
    key: "search",
    value: function search() {
      var keyword = this.quarystr.keyword ? {
        author: {
          $regex: this.quarystr.keyword,
          $options: "i"
        }
      } : {};
      this.quary.find(_objectSpread({}, keyword));
      return this;
    }
  }, {
    key: "filter",
    value: function filter() {
      var quarystrcopy = _objectSpread({}, this.quarystr);

      var removeingfields = ['keyword', 'limit', 'page'];
      removeingfields.forEach(function (fields) {
        return delete quarystrcopy[fields];
      });
      var quarystr = JSON.stringify(quarystrcopy);
      quarystr.replace(/\b(gt|lt|gte|lte)/g, function (match) {
        return "$".concat(match);
      });
      this.quary.find(JSON.parse(quarystr));
      return this;
    }
  }, {
    key: "pageinate",
    value: function pageinate(resperpage) {
      var currentpage = Number(this.quarystr.page) || 1;
      var skip = resperpage * currentpage - 1;
      this.quary.limit(resperpage).skip(skip);
      return this;
    }
  }]);

  return ApiFeatures;
}();

module.exports = ApiFeatures;