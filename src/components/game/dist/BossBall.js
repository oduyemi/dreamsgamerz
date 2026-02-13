"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.BossBall = void 0;
var Entity_1 = require("./Entity");
var BossBall = /** @class */ (function (_super) {
    __extends(BossBall, _super);
    function BossBall() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.health = 3;
        return _this;
    }
    BossBall.prototype.update = function () {
        this.progress += this.speed * 0.006;
    };
    BossBall.prototype.getPoints = function () {
        return 100;
    };
    BossBall.prototype.takeDamage = function () {
        this.health--;
        return this.health <= 0;
    };
    return BossBall;
}(Entity_1.Entity));
exports.BossBall = BossBall;
