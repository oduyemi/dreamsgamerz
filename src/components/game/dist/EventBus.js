"use strict";
exports.__esModule = true;
exports.EventBus = void 0;
var EventBus = /** @class */ (function () {
    function EventBus() {
        this.listeners = new Map();
    }
    EventBus.prototype.on = function (event, cb) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(cb);
    };
    EventBus.prototype.emit = function (event, payload) {
        var _a;
        (_a = this.listeners.get(event)) === null || _a === void 0 ? void 0 : _a.forEach(function (cb) { return cb(payload); });
    };
    return EventBus;
}());
exports.EventBus = EventBus;
