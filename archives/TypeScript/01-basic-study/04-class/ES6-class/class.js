'use strict';
const __extends = (this && this.__extends) || (function () {
  let extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf
    || (Array.isArray({ __proto__: [] }) && function (d, b) {
      d.__proto__ = b;
    })
    || function (d, b) {
      for (const p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) {
          d[p] = b[p];
        }
      }
    };
    return extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== 'function' && b !== null) {
      throw new TypeError(`Class extends value ${String(b)} is not a constructor or null`);
    }
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();
Object.defineProperty(exports, '__esModule', { value: true });
const Person = /** @class */ (function () {
  function Person(name) {
    this.name = name;
  }
  Person.prototype.getName = function () {
    console.log(this.name);
  };
  Person.prototype.setName = function (name) {
    this.name = name;
  };
  return Person;
}());
;
const p = new Person('arrow');
p.getName();
p.setName('bullet');
p.getName();
const Man = /** @class */ (function (_super) {
  __extends(Man, _super);
  function Man() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  return Man;
}(Person));
;
