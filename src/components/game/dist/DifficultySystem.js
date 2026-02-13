"use strict";
exports.__esModule = true;
exports.DifficultySystem = void 0;
var DifficultySystem = /** @class */ (function () {
    function DifficultySystem() {
        this.level = 1;
        this.progress = 0;
    }
    DifficultySystem.prototype.increaseProgress = function () {
        this.progress++;
        if (this.progress % 5 === 0) {
            this.level++;
        }
    };
    DifficultySystem.prototype.getSpeed = function () {
        return Math.min(0.02 + this.level * 0.002, 0.1);
    };
    DifficultySystem.prototype.getSpawnRate = function () {
        return Math.max(2000 - this.level * 120, 400);
    };
    return DifficultySystem;
}());
exports.DifficultySystem = DifficultySystem;
