"use strict";
exports.__esModule = true;
exports.AntiCheat = void 0;
var AntiCheat = /** @class */ (function () {
    function AntiCheat() {
        this.lastClick = 0;
    }
    AntiCheat.prototype.validateClick = function () {
        var now = Date.now();
        if (now - this.lastClick < 120)
            return false;
        this.lastClick = now;
        return true;
    };
    return AntiCheat;
}());
exports.AntiCheat = AntiCheat;
