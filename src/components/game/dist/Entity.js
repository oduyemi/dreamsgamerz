"use strict";
exports.__esModule = true;
exports.Entity = void 0;
var Entity = /** @class */ (function () {
    function Entity(speed) {
        this.progress = 0;
        this.id = crypto.randomUUID();
        this.speed = speed;
    }
    Entity.prototype.update = function () {
        this.progress += this.speed * 0.01;
    };
    Entity.prototype.reachedTarget = function () {
        return this.progress >= 1;
    };
    return Entity;
}());
exports.Entity = Entity;
