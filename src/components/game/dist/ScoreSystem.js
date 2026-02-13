"use strict";
exports.__esModule = true;
exports.ScoreSystem = void 0;
var ScoreSystem = /** @class */ (function () {
    function ScoreSystem() {
        this.score = 0;
        this.combo = 0;
        this.multiplier = 1;
        this.maxCombo = 0;
    }
    ScoreSystem.prototype.registerHit = function (basePoints) {
        this.combo++;
        this.multiplier = 1 + Math.floor(this.combo / 5);
        this.score += basePoints * this.multiplier;
        this.maxCombo = Math.max(this.maxCombo, this.combo);
    };
    ScoreSystem.prototype.resetCombo = function () {
        this.combo = 0;
        this.multiplier = 1;
    };
    ScoreSystem.prototype.getScore = function () {
        return this.score;
    };
    ScoreSystem.prototype.getTournamentScore = function (level) {
        return this.score + level * 50 + this.maxCombo * 10;
    };
    return ScoreSystem;
}());
exports.ScoreSystem = ScoreSystem;
